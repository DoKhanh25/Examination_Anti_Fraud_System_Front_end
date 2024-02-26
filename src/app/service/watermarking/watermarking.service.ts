import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatermarkingService {

  constructor() { }
  toZeroWidth(s: any) {
    // Trim spaces across edges
    s = s.trim();
  
    // Split to words separated by space
    const words = s.split(' ');
    
    const zwWords = [];
    for (const w of words) {
      zwWords.push(this.convertWord(w));
    }
    return zwWords.join('\uFEFF');
}
  convertWord(s: any) {
    const bits = this.toBits(s);
    
    const zws = [];
  
    for (const b of bits) {
      zws.push(this.convertLetter(b));
    }
   
    return zws.join('\u200D');
}
 toBits(s: any) {
    const bits = [];
    for (const c of s) {
      bits.push(c.charCodeAt().toString(2));
    }
  
    return bits;
  }
  
  convertLetter(s: any) {
    
    let sb = '';
    for (const c of s) {
      if (c === '0') {

        sb += '\u200C';
        continue;
      }
  
      sb += '\u200B';
    }
    return sb;
}

 separate(s: any) {
    const pt = [];
    const zw = [];
  
    for (const c of s) {
      switch (c) {
        case '\uFEFF':
        case '\u200B':
        case '\u200D':
        case '\u200C':
          zw.push(c);
          break;
        default:
          pt.push(c);
      }
    }
  
    return [pt, zw];
  }

    constructLetter(zws: any) {
    let binaryString = '';
  
    for (const r of zws) {
      switch (r) {
        case '\u200B':
          binaryString += '1';
          break;
        case '\u200C':
          binaryString += '0';
          break;
      }
    }
  
    const n = parseInt(binaryString, 2);
  
    if (Number.isNaN(n)) {
      throw new Error(`Failed to convert ${zws} to letter`);
    }
    return String.fromCharCode(n);
}
  
  constructKey(zws: any) {
    let key = '';
    let cl = [];
  
    for (const r of zws) {
      switch (r) {
        case '\u200D':
        case '\uFEFF':
          const dr = this.constructLetter(cl);
          key += dr;
          cl = [];
  
          if (r === '\uFEFF') {
            key += ' ';
          }
          break;
        default:
          cl.push(r);
      }
    }
  
    if (cl.length > 0) {
      const r = this.constructLetter(cl);
      if (!Number.isNaN(r)) {
        key += r;
      }
    }
  
    return key;
}
  Embed (data: any, key: any) {

  const zwKey = this.toZeroWidth(key);

  let t = 0;
  let embed = [];

  for (let i = 0; i < data.length; i++) {
    const c = data[i];

    if (i === 0) {
      embed.push(c);
    }

    if (t < zwKey.length) {
      embed.push(zwKey[t]);
      t++;
    }

    if (i !== 0) {
      embed.push(c);
    }
  }

  if (t < zwKey.length) {
    if (embed.length > 0) {
      const lb = embed[embed.length - 1];
      embed = embed.slice(0, embed.length - 1);
      embed.push(...zwKey.slice(t));
      embed.push(lb);
    } else {
      embed.push(...zwKey.slice(t));
  }
}
  return embed.join('');
}


Extract (embed: any) {
  const [pr, zws] = this.separate(embed);
  const key = this.constructKey(zws);
  return { plainText: pr.join(''), key };
}

EmbedWithLongText(text: any, key: any){
  let textArray = text.split('.');
  let embedArray: any[] = [];
  textArray.forEach((element: any) => {
    console.log(element)
    embedArray.push(this.Embed(element, key))
  })
  return embedArray.join('.');
}
}
