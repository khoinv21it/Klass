package com.example.employee_restapi_test;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class EmployeeRestapiTestApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeeRestapiTestApplication.class, args);
	}

}
