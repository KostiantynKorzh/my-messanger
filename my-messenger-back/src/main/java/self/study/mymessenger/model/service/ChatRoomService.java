package self.study.mymessenger.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import self.study.mymessenger.model.entity.ChatRoom;
import self.study.mymessenger.model.repository.ChatRoomRepository;

@Service
public class ChatRoomService {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    public String getChatRoomId(String senderId, String receiverId) {
        return chatRoomRepository.findBySenderIdAndReceiverId(senderId, receiverId)
                .map(ChatRoom::getChatId)
                .orElseGet(() -> {
                    String chatId = senderId + "_" + receiverId;

                    ChatRoom fromSenderToReceiver = ChatRoom.builder()
                            .chatId(chatId)
                            .senderId(senderId)
                            .receiverId(receiverId)
                            .build();

                    ChatRoom fromReceiverToSender = ChatRoom.builder()
                            .chatId(chatId)
                            .senderId(receiverId)
                            .receiverId(senderId)
                            .build();

                    chatRoomRepository.save(fromReceiverToSender);
                    chatRoomRepository.save(fromSenderToReceiver);

                    return chatId;
                });
    }

}
