package self.study.mymessenger.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import self.study.mymessenger.model.entity.ChatMessage;
import self.study.mymessenger.model.service.ChatMessageService;
import self.study.mymessenger.model.service.ChatRoomService;

@Controller
public class ChatController {

    @Autowired
    private ChatRoomService chatRoomService;

    @Autowired
    private ChatMessageService chatMessageService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessage chatMessage) {
        String chatId = chatRoomService.getChatRoomId(chatMessage.getSenderId(),
                chatMessage.getReceiverId());

        chatMessage.setChatId(chatId);

        chatMessageService.saveMessage(chatMessage);

        messagingTemplate.convertAndSendToUser(chatMessage.getReceiverId(),
                "/queue/messages",
                chatMessage);

    }

}
