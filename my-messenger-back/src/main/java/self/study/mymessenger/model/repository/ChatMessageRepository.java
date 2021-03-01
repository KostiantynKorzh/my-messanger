package self.study.mymessenger.model.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import self.study.mymessenger.model.entity.ChatMessage;

import java.util.List;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findAllByChatId(String chatId);
}
