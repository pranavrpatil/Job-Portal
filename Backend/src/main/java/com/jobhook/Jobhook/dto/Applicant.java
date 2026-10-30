package com.jobhook.Jobhook.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Applicant {
    private Long applicantId;
    private LocalDateTime timeStamp;
    private ApplicationStatus applicationStatus;
}
