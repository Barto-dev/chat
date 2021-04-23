import React, {useState} from 'react';
import classNames from 'classnames';
import {useAuthState} from '../../context/auth';
import moment from 'moment';

import {Button, OverlayTrigger, Popover, Tooltip} from 'react-bootstrap';

const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎'];

const Message = ({message}) => {
  const {user} = useAuthState();
  const sent = message.from === user.username;
  const received = !sent;
  const [showPopover, setShowPopover] = useState(false);

  const react = (reaction) => {
    console.log(reaction)
  }

  const reactButton = (
    <OverlayTrigger trigger="click"
                    show={showPopover}
                    onToggle={setShowPopover}
                    transition={false}
                    overlay={
                      <Popover className="rounded-pill">
                        <Popover.Content>
                          {reactions.map(reaction => (
                            <Button
                              variant="link"
                              key={reaction}
                              className="react-icon-button"
                              onClick={() => react(reaction)}>
                              {reaction}
                            </Button>
                          ))}
                        </Popover.Content>
                      </Popover>
                    }
                    placement="top">
      <Button variant="link" className="px-2">
        <i className="far fa-smile" />
      </Button>
    </OverlayTrigger>
  )

  return (
    <div className={classNames('d-flex my-3', {
      'ml-auto': sent,
      'mr-auto': received
    })}>
      {sent && reactButton}
      <OverlayTrigger
        placement={sent ? 'right' : 'left'}
        overlay={
          <Tooltip>
            {moment(message.createdAt).format('MMMM DD, YYYY @ h:mm a')}
          </Tooltip>
        } transition={false}>


        <div className={classNames('py-2 px-3 rounded-pill', {
          'bg-primary': sent,
          'bg-secondary': received
        })}>
          <p className={classNames({
            'text-white': sent
          })}>{message.content}</p>
        </div>

      </OverlayTrigger>
      {received && reactButton}
    </div>


  )
    ;
};

export default Message;
