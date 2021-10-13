import { MessageService } from "./message.service";

describe('MessageService', () => {
    it('should have no messages to start', () => {
        // arrange
        let service: MessageService = new MessageService();

        // act


        // assert
        expect(service.messages.length).toBe(0);
    });

    it('should have add a message when add is called', () => {
        // arrange 
        let service: MessageService = new MessageService();

        // act 
        service.add('New message');

        // assert
        expect(service.messages.length).toBe(1);
    });

    it('should clear all messages when clear is called', () => {
        // arrange
        let service: MessageService = new MessageService();
        service.add('New message');

        // act
        service.clear();

        // assert 
        expect(service.messages.length).toBe(0);
    });
});