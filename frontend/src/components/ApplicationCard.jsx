function ApplicationCard(props) {
    return (
        <div>
            <h2>{props.company}</h2>
            <p>{props.status}</p>
        </div>
    );
}

export default ApplicationCard;