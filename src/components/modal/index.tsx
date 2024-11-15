const ModalComponent = ({ children, onDelete, onCancel, btnText }: any) => {
    // if (!isOpen) return null; // Don't render anything if the modal is closed
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[40px]">
                <div>
                    {children}
                </div>


                <div className="mt-10 flex justify-end">
                    <button
                        className="rounded-3xl border !border-primary px-10 py-2 text-primary shadow-submit duration-300 hover:bg-primary/90 hover:text-white mr-2"
                        onClick={onDelete}
                    // disabled={loading}
                    >
                        {btnText} 
                    </button>

                    <button
                        className="rounded-3xl border !border-primary px-10 py-2 text-primary shadow-submit duration-300 hover:bg-primary/90 hover:text-white"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalComponent;
