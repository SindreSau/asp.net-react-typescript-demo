import React from 'react';

interface ModalProps {
    id: string;
    title: string;
    children: React.ReactNode;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    onPrimaryAction?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
                                                id,
                                                title,
                                                children,
                                                primaryButtonText = "Confirm",
                                                secondaryButtonText = "Secondary Action",
                                                onPrimaryAction
                                            }) => {
    return (
        <div
            className="modal fade"
            id={id}
            tabIndex={-1}
            aria-labelledby={`${id}Label`}
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={`${id}Label`}>{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-subtle"
                            data-bs-dismiss="modal"
                        >
                            {secondaryButtonText}
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={onPrimaryAction}
                        >
                            {primaryButtonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};