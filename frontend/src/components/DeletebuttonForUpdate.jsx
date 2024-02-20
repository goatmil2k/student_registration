


const DeletebuttonForUpdate = ({ handleDeleteRow }) => {
    return (
        <>
            <div className="delete-button" onClick={handleDeleteRow}>
                <div style={{
                    width: '20px',
                    height: '10px',
                    backgroundColor: 'white'
                }}></div>
            </div>
        </>
    )
}

export default DeletebuttonForUpdate;