export interface ExamProblemModel {
    examTitle: string;
    examDescription: string;
    startTime: Date | undefined;
    endTime: Date | undefined;
    duration: number;
    createBy: string;
    examParticipantSet: string[]
}