import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React from 'react';



const ConnectVpn: React.FC = () => {
   

    return (
        <>
            <Modal hideCloseButton={true}  placement='top-center' isOpen={true} >
                <ModalContent >
                    {() => (
                        <>
                            <ModalHeader  className="flex flex-col gap-1">Please, Connect VPN ✅</ModalHeader>
                            <ModalBody>
                                <p>
                                    VPN အရင်ချိတ်ပါ, ပြီးရင်ပြန်လာခဲ့ပါ 🍑🥰
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                {/* <Button color="danger" variant="light" onClick={handleClose}>
                                    Close
                                </Button> */}
                                <Button color="primary" onPress={() => {
                                    // Replace 'vpn://' with the correct URI scheme of the VPN app (like openvpn://, expressvpn://, nordvpn://, etc.)
                                    window.location.href = "/"; // Redirects to the VPN app if supported
                                }}>
                                    ချိတ်ပြီးရင်ဒီကိုနိုပ်ပါ✅
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ConnectVpn;
