/* eslint-disable func-names */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
(function() {
  const statusText = document.querySelector('#status');
  const connectionForm = document.querySelector('#connectionForm');
  const serverIpInput = document.querySelector('#serverIp');
  const actionsDiv = document.querySelector('#actions');
  const connectButton = document.querySelector('#connect');
  let disconnectButton;
  let echoButton;
  let socket;

  function disconnect() {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
    actionsDiv.removeChild(echoButton);
    actionsDiv.removeChild(disconnectButton);
    statusText.innerText = 'Connect to your Socket.io server';
    serverIpInput.removeAttribute('readonly');
    serverIpInput.classList.remove('form-control-plaintext');
    actionsDiv.appendChild(connectButton);
  }

  function handleEcho() {
    alert('Received an echo back!');
  }

  function handleConnectionError() {
    disconnect();
    alert('Failed to connect to server!');
  }

  function listenToSocketEvents() {
    socket.on('connect_error', handleConnectionError);
    socket.on('echo', handleEcho);
  }

  function connect() {
    const host = serverIpInput.value.trim();
    if (host) {
      socket = io(host);
      serverIpInput.setAttribute('readonly', 'true');
      actionsDiv.removeChild(connectButton);
      actionsDiv.append(echoButton, disconnectButton);
      statusText.innerText = 'Connected';
      serverIpInput.classList.add('form-control-plaintext');
      listenToSocketEvents();
    }
  }

  function echo() {
    socket.emit('echo');
  }

  function createButton(type, innerText, className, { ...rest }) {
    return Object.assign(document.createElement('button'), {
      type,
      innerText,
      className,
      ...rest,
    });
  }

  function initElements() {
    echoButton = createButton('button', 'Echo', 'btn btn-primary', {
      id: 'echo',
    });
    echoButton.addEventListener('click', echo);
    disconnectButton = createButton('button', 'Disconnect', 'btn btn-danger', {
      id: 'disconnect',
    });
    disconnectButton.addEventListener('click', disconnect);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (!socket) {
      connect();
    }
  }

  function listenToFormSubmission() {
    connectionForm.addEventListener('submit', handleFormSubmit);
  }

  initElements();
  listenToFormSubmission();
})();
