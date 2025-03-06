import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React from 'react';

type Props = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
};

const AdultsModel: React.FC<Props> = ({ isOpen, onOpenChange }) => {
    const handleAdClick = () => {
        window.open("https://www.effectiveratecpm.com/tug04kfbu?key=b336b5a3a07e0d1f18f875e49dae8676", "_blank");
    };
    return (
        <>
            {/* Optionally, you can add a button here to trigger onOpenChange(true) if you need manual control */}
            <Modal size="md" hideCloseButton={true} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose: () => void) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Are you above 18 years old?</ModalHeader>
                            <ModalBody>
                                <p className="text-sm text-gray-600 text-center">
                                    You must be 18 or older to access this content. Please confirm your age to continue.
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={handleAdClick} color="primary" onPress={onClose}>
                                    Above 18+
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default AdultsModel;
