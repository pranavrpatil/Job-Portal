package com.jobhook.Jobhook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class JobhookApplication {

	public static void main(String[] args) {
		SpringApplication.run(JobhookApplication.class, args);
	}

}
