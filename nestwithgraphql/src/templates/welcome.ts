export const invitationTemplate = (
  firstName?: string,
  lastName?: string,
  organizationName?: string,
  invitationURL?: string,
  isTransferred?: boolean,
) =>
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />

    <title>Email</title>
    <meta content="" name="descriptison" />
    <meta content="" name="keywords" />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
      rel="stylesheet"
    />
  </head>

  <style>
    body {
      font-family: 'Roboto', sans-serif;
      margin: 0px;
    }
  </style>

  <body>
    <div
      style="
        max-width: 100%;
        background-color: #ededed;
        margin: 30px auto;
        padding: 40px 30px 60px;
      "
    >
      <div style="text-align: center; padding-bottom: 20px">
        <img
          src="https://illumidesk-test-dashboard-avatars.s3.amazonaws.com/logo.png"
          alt="logo"
        />
      </div>

      <div style="padding: 18px 32px 18px 32px; line-height: 22px">
        <div>
          <div style="text-align: center">
            ${
              isTransferred
                ? `
            <span style="font-size: 16px; color: #4c4c4c">
              <b>${firstName} ${lastName}</b> has requested ownership transfer
              organization <br />Click here to accept the ownership. </span
            >`
                : `<span style="font-size: 16px; color: #4c4c4c">
              You've been invited to join
              <b>${organizationName}</b> organization. <br />Click here to
              accept the invitation. </span
            >`
            }
          </div>
        </div>
      </div>

      <div style="padding: 10px 10px 10px 10px; text-align: center">
        <a
          href="${invitationURL}"
          style="
            display: block;
            border: 2px solid #417837;
            border-radius: 24px;
            color: #ffffff;
            font-size: 14px;
            font-weight: bold;
            padding: 12px 30px 12px 30px;
            text-align: center;
            text-decoration: none;
            width: 150px;
            margin: 0px auto;
            background-color: #417837;
            outline: none;
            cursor: pointer;
          "
          target="_blank"
        >
          Click here
        </a>
      </div>
    </div>
  </body>
</html>
`;
