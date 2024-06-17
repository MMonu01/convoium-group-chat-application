import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Button, DarkMode } from "@chakra-ui/react";

const RoomModal = ({ isOpen, onClose, room }) => {
  const shareGroupId = () => {
    navigator.share({
      title: room.room_name,
      text: room.room_id,
    });
    onClose();
  };
  return (
    <>
      <DarkMode>
        <Modal onClose={onClose} size="sm" isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color={"white"}>{room.room_name}</ModalHeader>
            <ModalCloseButton color={"white"} />
            <ModalBody className="flex flex-col gap-4">
              <Button onClick={shareGroupId} className="w-full">
                Share group id
              </Button>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </DarkMode>
    </>
  );
};

export default RoomModal;
