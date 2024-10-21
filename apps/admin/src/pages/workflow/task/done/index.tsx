import { TOKEN, getToken } from 'utils';

export default () => {
  const token = getToken('RuoYi_token');
  console.log('token', token);

  return (
    <>
      <iframe
        className="b-0"
        src={`http://192.168.10.79/bpm/task/done?token=${token}`}
        width="100%"
        height="100%"
      ></iframe>
    </>
  );
};
