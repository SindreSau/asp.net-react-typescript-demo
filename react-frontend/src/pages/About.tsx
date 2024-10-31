import React from 'react';
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";

const About: React.FC = () => {
    const handlePrimaryAction = () => {
        console.log('Primary action clicked');
        // Add your action logic here
    };

    return (
        <section>
            <h1>Additional React stuff:</h1>

            <p>Reusable button components:</p>
            <div className='border rounded-2 d-flex justify-content-around align-items-center text-center p-4'>
                <Button
                    variant='primary'
                    size='sm'
                    data-bs-toggle="modal"
                    data-bs-target="#primaryModal"
                >
                    Primary Button
                </Button>
                <Button
                    variant='secondary'
                    size='md'
                    data-bs-toggle="modal"
                    data-bs-target="#secondaryModal"
                >
                    Secondary Button
                </Button>
                <Button
                    variant='success'
                    size='lg'
                    data-bs-toggle="modal"
                    data-bs-target="#successModal"
                >
                    Success Button
                </Button>
                <Button
                    variant='danger'
                    size='sm'
                    data-bs-toggle="modal"
                    data-bs-target="#dangerModal"
                >
                    Danger Button
                </Button>
                <Button
                    variant='warning'
                    size='md'
                    data-bs-toggle="modal"
                    data-bs-target="#warningModal"
                >
                    Warning Button
                </Button>
                <Button
                    variant='info'
                    size='lg'
                    data-bs-toggle="modal"
                    data-bs-target="#infoModal"
                >
                    Info Button
                </Button>
            </div>

            {/* Modals for each button */}
            <Modal
                id="primaryModal"
                title="Primary Action"
                primaryButtonText="Confirm Primary"
                onPrimaryAction={handlePrimaryAction}
            >
                This is the primary modal content. It demonstrates our reusable modal component.
            </Modal>

            <Modal
                id="secondaryModal"
                title="Secondary Action"
                primaryButtonText="Confirm Secondary"
                onPrimaryAction={handlePrimaryAction}
            >
                This is the secondary modal content with different text and actions.
            </Modal>

            <Modal
                id="successModal"
                title="Success Action"
                primaryButtonText="Complete Action"
                onPrimaryAction={handlePrimaryAction}
            >
                This modal confirms a successful action with custom button text.
            </Modal>

            <Modal
                id="dangerModal"
                title="Danger Action"
                primaryButtonText="Delete"
                secondaryButtonText="Cancel"
                onPrimaryAction={handlePrimaryAction}
            >
                Warning: This action cannot be undone. Please confirm you want to proceed.
            </Modal>

            <Modal
                id="warningModal"
                title="Warning Action"
                primaryButtonText="Proceed"
                onPrimaryAction={handlePrimaryAction}
            >
                This action requires your attention. Please review before proceeding.
            </Modal>

            <Modal
                id="infoModal"
                title="Information"
                primaryButtonText="Got it"
                secondaryButtonText="Close"
                onPrimaryAction={handlePrimaryAction}
            >
                This modal provides additional information about the feature.
            </Modal>
        </section>
    );
};

export default About;