package self.study.mymessenger.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import self.study.mymessenger.model.entity.ChatMessage;
import self.study.mymessenger.model.repository.ChatMessageRepository;

@Service
public class ChatMessageService {

    @Autowired
    ChatMessageRepository chatMessageRepository;

    public ChatMessage saveMessage(ChatMessage message) {
        return chatMessageRepository.save(message);
    }

}
