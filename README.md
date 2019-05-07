# webchat-loader

<table>
  <thead>
    <tr>
      <th>Version</th>
      <th>Today</th>
      <th>No `contentUrl`</th>
      <th>`contentUrl` of 401</th>
      <th>A placeholder `contentUrl`</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>All versions of v4</td>
      <td>Working until <kbd>F5</kbd>, turns into broken image from https://bcdirectlineeastus3.blob.core.windows.net/at12345/a1b2c3d-original.</td>
      <td>Shortly after upload, turns into broken image. <kbd>F5</kbd> will continue to show broken image.</td>
      <td>Shortly after upload, turns into broken image. <kbd>F5</kbd> will continue to show broken image.</td>
      <td>Shortly after upload, turns into placeholder image. <kbd>F5</kbd> will continue to show placeholder image.</td>
    </tr>
    <tr>
      <td>Latest v3 and Scorpio</td>
      <td>Working until <kbd>F5</kbd>, turns into broken image from https://bcdirectlineeastus3.blob.core.windows.net/at12345/a1b2c3d-original.</td>
      <td>Show uploaded photo. After <kbd>F5</kbd>, turns into broken image.</td>
      <td>Show uploaded photo. After <kbd>F5</kbd>, turns into broken image.</td>
      <td>Show uploaded photo. After <kbd>F5</kbd>, turns into placeholder image.</td>
    </tr>
    <tr>
      <td>Aries</td>
      <td>Working.</td>
      <td>Shortly after upload, turns into broken image.</td>
      <td>Shortly after upload, turns into broken image.</td>
      <td>Shortly after upload, turns into placeholder image.</td>
    </tr>
  </tbody>
</table>

## Conclusion

All uploaded images will be echoed back from Direct Line.

- v4: Initially, Web Chat show the uploading image. After the activity is echoed, Web Chat will use the image in the echoed activity.
   - Empty content URL will eventually show a broken image icon.
   - URL with erroneous respond will eventually show a broken image icon.
   - Placeholder image will eventually show up correctly.
- v3: Web Chat will always show the uploading image even after activity is echoed. I.e. image not getting replaced until <kbd>F5</kbd>.
   - Empty content URL will show an empty bubble only after <kbd>F5</kbd>.
   - URL with erroneous respond will show a broken image icon only after <kbd>F5</kbd>.
   - Placeholder image will show up correctly only after <kbd>F5</kbd>.
- v1: Very similar to v4. But will not show anything while uploading image. It will show the image in the echoed activity.
   - Empty content URL will eventually show a broken image icon.
   - URL with erroneous respond will eventually show a broken image icon.
   - Placeholder image will eventually show up correctly.

After <kbd>F5</kbd>, all of them will show the replaced image (broken, empty, or placeholder). This is because chat history is being resent from Direct Line.

## Notes

### Buggy Direct Line resend history over Web Socket

Direct Line exhibits very strange behavior for v3/v4 but not Aries. It only bugged in Web Socket, but not thru polling.

When the photo is uploaded, the echoed message has attachment of https://webchat.botframework.com/attachments/H7i...X-j/0000001/0/12345.png?t=token. This is also true if there are two Web Chat loaded at the time the file is uploaded.

After <kbd>F5</kbd>, the message history is being resent from Direct Line. But on resend, the attachment URL become https://bcdirectlineeastus3.blob.core.windows.net/at12345/ABCDE-original. And the content of this file is encrypted with an unknown key.

Looks like Direct Line resend history is broken today for Web Socket.
