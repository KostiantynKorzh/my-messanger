package self.study.mymessenger.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import self.study.mymessenger.model.entity.ChatMessage;
import self.study.mymessenger.model.repository.ChatMessageRepository;

import java.util.List;

@Service
public class ChatMessageService {

    @Autowired
    ChatMessageRepository chatMessageRepository;

    @Autowired
    ChatRoomService chatRoomService;

    public ChatMessage saveMessage(ChatMessage message) {
        return chatMessageRepository.save(message);
    }

    public List<ChatMessage> getAllMessagesForChat(String senderId, String receiverId) {
        String chatId = chatRoomService.getChatRoomId(senderId, receiverId);
        return chatMessageRepository.findAllByChatId(chatId);
    }

}
