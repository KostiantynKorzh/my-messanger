import React, {useEffect} from "react";
import Moment from "react-moment";

const Message = (props) => {

    useEffect(() => {
        numberOfRowsInMessage(props.message.content)
    }, []);

    // TODO depending on number of lines
    const numberOfRowsInMessage = (message) => {
        let height = document.getElementById('msgDiv').offsetHeight;
        let lineHeight = document.getElementById('msgDiv').style.lineHeight;
        // let temp = document.getElementById('msgDiv').getClientRects().length;
        // console.log(message, temp);
    }

    return (
        <div id="msgDiv" style={{
            display: 'block',
            backgroundColor: `${props.message.backgroundColor}`,
            padding: '1%',
            borderRadius: '4px',
            lineHeight: '1.7em',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
            // paddingLeft: '2%',
        }}>
            <div style={{
                display: 'inline',
                // border: '3px solid red',
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
            }}>{props.message.content}
                <Moment style={{
                    // display: 'inline',
                    color: 'gray',
                    fontSize: '0.7em',
                    marginLeft: '2%',
                }} format="HH:MM">{props.message.timestamp}</Moment>
            </div>
        </div>
    );

};

export default Message;