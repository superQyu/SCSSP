import React from 'react';

function ErrorPage(props: {
  children?:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: '5%',
      }}
    >
      {props?.children ? (
        props.children
      ) : (
        <>
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>{props?.children}</p>
        </>
      )}
    </div>
  );
}

export default ErrorPage;
