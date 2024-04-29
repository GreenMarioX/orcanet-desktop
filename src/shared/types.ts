import { ActivityInfo, PeerInfo, FilePeers, JobID } from "./models";

export type GetActivity = (
  filename: ActivityInfo["Name"],
  cid: ActivityInfo["Hash"]
) => Promise<ActivityInfo>;
export type GetActivities = () => Promise<ActivityInfo[]>;
// export type ReadAcitvity = (title: ActivityInfo['ID']) => Promise<NoteContent>
export type CreateActivity = () => Promise<ActivityInfo["Hash"] | false>;
export type DeleteActivity = (title: ActivityInfo["Hash"]) => Promise<boolean>;

export type GetPeers = () => Promise<PeerInfo[]>;

/* Market Page */
export type FindPeers = (fileHash: string) => Promise<FilePeers>;
export type StartJobs = (jobIDs: JobID[]) => Promise<boolean>;
export type PauseJobs = (jobIDs: JobID[]) => Promise<boolean>;
export type TerminateJobs = (jobIDs: JobID[]) => Promise<boolean>;
