import { Project, Candidate, JobPosition, Opening } from ".";

// Project
export type ProjectResponseArray = {
    status: string;
    data: Project[];
    message: string;
 };

export type ProjectResponse = {
    status: string;
    data: Project;
    message: string;
 };

 // JobPosition
export type JobPositionResponseArray = {
    status: string;
    data: JobPosition[];
    message: string;
 };

export type JobPositionResponse = {
    status: string;
    data: JobPosition;
    message: string;
 };

// Opening
export type OpeningsResponseArray = {
    status: string;
    data: Opening[];
    message: string;
 }
 
export type OpeningResponse = {
    status: string;
    data: Opening;
    message: string;
 }
 

 // Candidate
export type CandidateResponseArray = {
    status: string;
    data: Candidate[];
    message: string;
 }
 
export type CandidateResponse = {
    status: string;
    data: Candidate;
    message: string;
 }
 
