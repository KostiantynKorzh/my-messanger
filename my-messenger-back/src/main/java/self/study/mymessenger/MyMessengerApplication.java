package self.study.mymessenger;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class MyMessengerApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyMessengerApplication.class, args);
    }

}
