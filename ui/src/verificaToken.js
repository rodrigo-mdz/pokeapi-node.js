const verificaToken = () => {
  const token = localStorage.getItem('token');
  if (!token && location.pathname != '/') location.replace('/');
  else if (token && location.pathname === '/') location.replace('/collection');
}

verificaToken();
