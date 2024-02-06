import { css, cx } from 'emotion';
import { LoremIpsum } from 'lorem-ipsum';
import React, { useCallback, useMemo, useState } from 'react';

import useTranscriptDialogContent from '../data/hooks/useTranscriptDialogContent';
import useTranscriptDialogVisible from '../data/hooks/useTranscriptDialogVisible';
import parseChatHistoryFromHARFile from '../util/parseChatHistoryFromHARFile';
import FileUploadButton from './FileUploadButton';

import type { ChangeEventHandler, FC, KeyboardEventHandler, MouseEventHandler } from 'react';

const DIALOG_CSS = css({
  '&.transcript-dialog': {
    backgroundColor: 'White',
    borderRadius: 4,
    boxShadow: '0 0 10px rgba(0, 0, 0, .05)',
    bottom: 20,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    left: 20,
    position: 'fixed',
    right: 20,
    top: 20,

    '& .transcript-dialog__button-bar': {
      padding: 5
    },

    '& .transcript-dialog__body': {
      height: '100%',
      overflow: 'scrolling',
      width: '100%'
    },

    '& .transcript-dialog__text-area': {
      backgroundColor: 'Transparent',
      border: 0,
      boxSizing: 'border-box',
      flex: 1,
      fontFamily: 'Cascadia Code, Consolas, monospace',
      height: '100%',
      outline: 0,
      padding: 5,
      resize: 'none',
      width: '100%'
    },

    '& .transcript-dialog__text-area::placeholder': {
      color: '#CCC'
    },

    '& .transcript-dialog__text-area--invalid': {
      color: 'Red'
    }
  }
});

const GENERATE_COUNT = 50;
const NOW = Date.now();

const SAMPLE_TRANSCRIPT_JSON = JSON.stringify(
  [
    {
      id: 'a-00001',
      text: 'What can I do for you?',
      timestamp: new Date(NOW - 120000).toISOString(),
      type: 'message',
      attachments: [
        {
          content: {
            type: 'AdaptiveCard',
            body: [
              {
                type: 'TextBlock',
                text: 'You can choose one of the followings.'
              }
            ],
            $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
            version: '1.2',
            actions: [
              {
                type: 'Action.Submit',
                title: 'What time is it?'
              },
              {
                type: 'Action.Submit',
                title: 'What is the weather?'
              }
            ]
          },
          contentType: 'application/vnd.microsoft.card.adaptive'
        }
      ]
    },
    {
      from: {
        role: 'user'
      },
      id: 'a-00002',
      text: 'What time is it?',
      timestamp: new Date(NOW - 60000).toISOString(),
      type: 'message'
    },
    {
      id: 'a-00003',
      text: `It's ${new Date(NOW).toLocaleTimeString()}.`,
      timestamp: new Date(NOW).toISOString(),
      type: 'message'
    }
  ],
  null,
  2
);

const SAMPLE_TRANSCRIPT_JSON_2 = JSON.stringify(
  [
    {
      from: {
        role: 'bot'
      },
      type: 'message',
      text: 'Hi! I’m Cody, the devbot. How can I help?'
    },
    {
      from: {
        role: 'user'
      },
      type: 'message',
      text: "Can you explain how to configure PAD's proxy settings?"
    },
    {
      from: {
        role: 'bot'
      },
      type: 'message',
      timestamp: '2023-10-03T17:00:00.000Z',
      text: 'Sure, you should override the default proxy settings[1]​[2], when your proxy server requires authentication[3].\n\n[1]: https://support.microsoft.com/en-us/windows/use-a-proxy-server-in-windows-03096c53-0554-4ffe-b6ab-8b1deee8dae1 "Use a proxy server in Windows"\n[2]: https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/configure-proxy-server-settings "Configure proxy server settings - Windows Server"\n[3]: cite:1 "Introduction Configuring proxy settings is a fundamental aspect..."\n',
      entities: [
        {
          '@context': 'https://schema.org',
          '@id':
            'https://support.microsoft.com/en-us/windows/use-a-proxy-server-in-windows-03096c53-0554-4ffe-b6ab-8b1deee8dae1',
          '@type': 'Claim',
          type: 'https://schema.org/Claim',
          claimInterpreter: {
            '@type': 'Project',
            slogan: 'Surfaced with Azure OpenAI'
          }
        },
        {
          '@context': 'https://schema.org',
          '@id':
            'https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/configure-proxy-server-settings',
          '@type': 'Claim',
          type: 'https://schema.org/Claim',
          claimInterpreter: {
            '@type': 'Project',
            slogan: 'Surfaced with Azure OpenAI'
          },
          name: 'Configure proxy server settings - Windows Server'
        },
        {
          '@context': 'https://schema.org',
          '@id': 'cite:1',
          '@type': 'Claim',
          name: 'Sample Citation From File',
          type: 'https://schema.org/Claim',
          claimInterpreter: {
            '@type': 'Project',
            slogan: 'Surfaced with Azure OpenAI'
          },
          text: "Aute Lorem id laboris Lorem do dolor mollit. Officia dolore dolor do culpa nostrud velit officia magna ut aute pariatur excepteur ut cupidatat. Minim minim sunt enim pariatur incididunt eiusmod esse adipisicing do do nulla consequat minim. Exercitation enim adipisicing esse non pariatur duis deserunt eu magna enim amet irure veniam. Minim labore aliquip velit exercitation Lorem exercitation minim excepteur.\n\n## Introduction\n\n*Configuring* **proxy** _settings_ __is__ a fundamental aspect of `network` and [system administration](http://example.com). Proxies serve as intermediaries between a user's device and the internet, providing various benefits such as improved security, anonymity, and network performance. In this guide, we will delve into the intricacies of configuring Proxy Auto-Discovery (PAD) proxy settings. We'll explore what PAD is, why it's essential, and how to configure it effectively. []\n> This is a block quote!\n\n1. first\n1. second\n1. third\n\n- unordered A\n- unordered B\n- unordered C\n\n***\n\n## Understanding Proxy Auto-Discovery (PAD)\n\nProxy Auto-Discovery, often abbreviated as PAD, is a mechanism that simplifies the process of configuring proxy settings for network-connected devices. Its primary purpose is to automate the discovery of proxy servers and settings without manual intervention. PAD relies on a specific protocol called Web Proxy Auto-Discovery (WPAD).\n\n## The Importance of Configuring PAD Proxy Settings\n\nConfiguring PAD proxy settings is crucial for several reasons:\n\n- Efficiency: PAD eliminates the need for users or administrators to manually configure proxy settings on individual devices. This automation saves time and reduces the risk of configuration errors.\n- Scalability: In large organizations with numerous devices, configuring proxies manually can be a daunting task. PAD simplifies this process, making it manageable even in complex network environments.\n- Consistency: Automated configuration ensures that all devices in the network use consistent proxy settings, reducing potential discrepancies and ensuring uniform security measures.\n- Security: Properly configured proxy settings can enhance network security by filtering and monitoring traffic, blocking malicious websites, and protecting against threats like malware and phishing.\n- Anonymity: For users who require anonymity when browsing, PAD can route traffic through anonymous proxies, safeguarding their identity online.\n\n## Configuring PAD Proxy Settings\n\nNow, let's delve into the steps to configure PAD proxy settings effectively:\n\n- Identify Your Proxy Server: Before configuring PAD, you need to identify the proxy server(s) you want to use. This could be an in-house proxy server or a third-party service.\n- Ensure WPAD Support: Verify that your network environment supports the Web Proxy Auto-Discovery (WPAD) protocol. This typically involves setting up a WPAD server or ensuring that your existing DHCP and DNS servers can provide WPAD information.\n- Create a PAC File: A PAC (Proxy Auto-Configuration) file contains instructions for the device to determine when and how to use the proxy server. You can create a PAC file using a text editor, and it should be hosted on a web server accessible to all devices in your network.\n- Configure DHCP: If your network uses DHCP (Dynamic Host Configuration Protocol), you can configure it to provide the URL of the PAC file to client devices. This simplifies the configuration process as devices will automatically fetch the PAC file.\n- Configure DNS: Similarly, DNS (Domain Name System) can be configured to resolve the WPAD host (e.g., wpad.yourdomain.com) to the location of the PAC file. This allows devices to locate the PAC file without manual intervention.\n- Test Configuration: After configuring DHCP and DNS, it's essential to test the configuration to ensure that devices can access the PAC file correctly. You can do this by attempting to access the PAC file URL from a client device's web browser.\n- Configure Devices: For devices that do not support DHCP or WPAD, you may need to configure proxy settings manually. This typically involves entering the PAC file URL or specifying the proxy server address and port in the device's settings.\n- Monitor and Maintain: Regularly monitor your proxy configuration to ensure that it continues to function correctly. Update the PAC file as needed to reflect changes in your network or proxy server settings.\n\n## Common Challenges and Troubleshooting\n\nWhile configuring PAD proxy settings, you may encounter some common challenges:\n\n- Firewall Issues: Ensure that your network's firewall rules permit traffic to and from the PAC file server and proxy server(s).\n- DNS Resolution Problems: Verify that DNS is correctly configured to resolve the WPAD host to the PAC file's location.\n- PAC File Errors: Carefully review the PAC file for syntax errors or incorrect instructions that could disrupt the proxy configuration.\n- Device Compatibility: Some devices may not fully support WPAD, requiring manual configuration. Be prepared to address these exceptions.\n- Security Concerns: Maintain robust security measures to prevent unauthorized access to your PAC file or proxy servers.\n\n## Conclusion\n\nConfiguring Proxy Auto-Discovery (PAD) proxy settings is a vital task for network administrators seeking to streamline the proxy configuration process and enhance network security. By automating the discovery and configuration of proxy servers, PAD ensures efficiency, consistency, and scalability in network environments. However, it is essential to follow the recommended steps carefully and be prepared to troubleshoot common challenges to maintain a smooth proxy configuration process. Ultimately, a well-configured PAD proxy setup contributes to a more secure, efficient, and user-friendly network environment.\n"
        },
        {
          '@context': 'https://schema.org',
          '@type': 'ReplyAction',
          type: 'https://schema.org/ReplyAction',
          description: 'Surfaced by Azure OpenAI',
          provider: {
            '@type': 'Project',
            name: 'Azure OpenAI',
            url: 'https://www.microsoft.com/en-us/ai/responsible-ai'
          }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'VoteAction',
          type: 'https://schema.org/VoteAction',
          actionOption: 'upvote'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'VoteAction',
          type: 'https://schema.org/VoteAction',
          actionOption: 'downvote'
        }
      ]
    }
  ],
  null,
  2
);

const SAMPLE_TRANSCRIPT_JSON_3 = JSON.stringify(
  [
    {
      from: {
        role: 'bot'
      },
      id: 'a-00001',
      type: 'message',
      text: 'Hi! I’m Cody, the devbot. How can I help?'
    },
    {
      from: {
        role: 'user'
      },
      id: 'a-00002',
      type: 'message',
      text: "Can you explain how to configure PAD's proxy settings?"
    },
    {
      from: {
        role: 'bot'
      },
      id: 'a-00003',
      type: 'message',
      timestamp: '2023-10-03T17:00:00.000Z',
      text: 'Sure, you should override the default proxy settings[1]​[2], when your proxy server requires authentication[3].\n\n[1]: https://support.microsoft.com/en-us/windows/use-a-proxy-server-in-windows-03096c53-0554-4ffe-b6ab-8b1deee8dae1 "Use a proxy server in Windows"\n[2]: https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/configure-proxy-server-settings "Configure proxy server settings - Windows Server"\n[3]: cite:1 "Introduction Configuring proxy settings is a fundamental aspect..."\n',
      entities: [
        {
          '@context': 'https://schema.org',
          '@id':
            'https://support.microsoft.com/en-us/windows/use-a-proxy-server-in-windows-03096c53-0554-4ffe-b6ab-8b1deee8dae1',
          '@type': 'Claim',
          type: 'https://schema.org/Claim',
          claimInterpreter: {
            '@type': 'Project',
            slogan: 'Surfaced with Azure OpenAI'
          }
        },
        {
          '@context': 'https://schema.org',
          '@id':
            'https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/configure-proxy-server-settings',
          '@type': 'Claim',
          type: 'https://schema.org/Claim',
          claimInterpreter: {
            '@type': 'Project',
            slogan: 'Surfaced with Azure OpenAI'
          },
          name: 'Configure proxy server settings - Windows Server'
        },
        {
          '@context': 'https://schema.org',
          '@id': 'cite:1',
          '@type': 'Claim',
          type: 'https://schema.org/Claim',
          claimInterpreter: {
            '@type': 'Project',
            slogan: 'Surfaced with Azure OpenAI'
          },
          name: 'Sample Citation From File',
          text: "Aute Lorem id laboris Lorem do dolor mollit. Officia dolore dolor do culpa nostrud velit officia magna ut aute pariatur excepteur ut cupidatat. Minim minim sunt enim pariatur incididunt eiusmod esse adipisicing do do nulla consequat minim. Exercitation enim adipisicing esse non pariatur duis deserunt eu magna enim amet irure veniam. Minim labore aliquip velit exercitation Lorem exercitation minim excepteur.\n\n## Introduction\n\n*Configuring* **proxy** _settings_ __is__ a fundamental aspect of `network` and [system administration](http://example.com). Proxies serve as intermediaries between a user's device and the internet, providing various benefits such as improved security, anonymity, and network performance. In this guide, we will delve into the intricacies of configuring Proxy Auto-Discovery (PAD) proxy settings. We'll explore what PAD is, why it's essential, and how to configure it effectively. []\n> This is a block quote!\n\n1. first\n1. second\n1. third\n\n- unordered A\n- unordered B\n- unordered C\n\n***\n\n## Understanding Proxy Auto-Discovery (PAD)\n\nProxy Auto-Discovery, often abbreviated as PAD, is a mechanism that simplifies the process of configuring proxy settings for network-connected devices. Its primary purpose is to automate the discovery of proxy servers and settings without manual intervention. PAD relies on a specific protocol called Web Proxy Auto-Discovery (WPAD).\n\n## The Importance of Configuring PAD Proxy Settings\n\nConfiguring PAD proxy settings is crucial for several reasons:\n\n- Efficiency: PAD eliminates the need for users or administrators to manually configure proxy settings on individual devices. This automation saves time and reduces the risk of configuration errors.\n- Scalability: In large organizations with numerous devices, configuring proxies manually can be a daunting task. PAD simplifies this process, making it manageable even in complex network environments.\n- Consistency: Automated configuration ensures that all devices in the network use consistent proxy settings, reducing potential discrepancies and ensuring uniform security measures.\n- Security: Properly configured proxy settings can enhance network security by filtering and monitoring traffic, blocking malicious websites, and protecting against threats like malware and phishing.\n- Anonymity: For users who require anonymity when browsing, PAD can route traffic through anonymous proxies, safeguarding their identity online.\n\n## Configuring PAD Proxy Settings\n\nNow, let's delve into the steps to configure PAD proxy settings effectively:\n\n- Identify Your Proxy Server: Before configuring PAD, you need to identify the proxy server(s) you want to use. This could be an in-house proxy server or a third-party service.\n- Ensure WPAD Support: Verify that your network environment supports the Web Proxy Auto-Discovery (WPAD) protocol. This typically involves setting up a WPAD server or ensuring that your existing DHCP and DNS servers can provide WPAD information.\n- Create a PAC File: A PAC (Proxy Auto-Configuration) file contains instructions for the device to determine when and how to use the proxy server. You can create a PAC file using a text editor, and it should be hosted on a web server accessible to all devices in your network.\n- Configure DHCP: If your network uses DHCP (Dynamic Host Configuration Protocol), you can configure it to provide the URL of the PAC file to client devices. This simplifies the configuration process as devices will automatically fetch the PAC file.\n- Configure DNS: Similarly, DNS (Domain Name System) can be configured to resolve the WPAD host (e.g., wpad.yourdomain.com) to the location of the PAC file. This allows devices to locate the PAC file without manual intervention.\n- Test Configuration: After configuring DHCP and DNS, it's essential to test the configuration to ensure that devices can access the PAC file correctly. You can do this by attempting to access the PAC file URL from a client device's web browser.\n- Configure Devices: For devices that do not support DHCP or WPAD, you may need to configure proxy settings manually. This typically involves entering the PAC file URL or specifying the proxy server address and port in the device's settings.\n- Monitor and Maintain: Regularly monitor your proxy configuration to ensure that it continues to function correctly. Update the PAC file as needed to reflect changes in your network or proxy server settings.\n\n## Common Challenges and Troubleshooting\n\nWhile configuring PAD proxy settings, you may encounter some common challenges:\n\n- Firewall Issues: Ensure that your network's firewall rules permit traffic to and from the PAC file server and proxy server(s).\n- DNS Resolution Problems: Verify that DNS is correctly configured to resolve the WPAD host to the PAC file's location.\n- PAC File Errors: Carefully review the PAC file for syntax errors or incorrect instructions that could disrupt the proxy configuration.\n- Device Compatibility: Some devices may not fully support WPAD, requiring manual configuration. Be prepared to address these exceptions.\n- Security Concerns: Maintain robust security measures to prevent unauthorized access to your PAC file or proxy servers.\n\n## Conclusion\n\nConfiguring Proxy Auto-Discovery (PAD) proxy settings is a vital task for network administrators seeking to streamline the proxy configuration process and enhance network security. By automating the discovery and configuration of proxy servers, PAD ensures efficiency, consistency, and scalability in network environments. However, it is essential to follow the recommended steps carefully and be prepared to troubleshoot common challenges to maintain a smooth proxy configuration process. Ultimately, a well-configured PAD proxy setup contributes to a more secure, efficient, and user-friendly network environment.\n"
        },
        {
          '@context': 'https://schema.org',
          '@type': 'VoteAction',
          'type': 'https://schema.org/VoteAction',
          actionOption: 'upvote',
          'actionOption-input': 'required',
          description: 'Upvote',
          target: {
            '@type': 'EntryPoint',
            actionPlatform: 'https://directline.botframework.com',
            urlTemplate: 'ms-directline://messageback'
          }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'VoteAction',
          'type': 'https://schema.org/VoteAction',
          actionOption: 'downvote',
          'actionOption-input': 'required',
          description: 'Downvote',
          target: {
            '@type': 'EntryPoint',
            actionPlatform: 'https://directline.botframework.com',
            urlTemplate: 'ms-directline://messageback'
          }
        }
      ]
    }
  ],
  null,
  2
);

const SAMPLE_TRANSCRIPT_JSON_4 = JSON.stringify(
  [
    {
      from: {
        role: 'bot'
      },
      type: 'message',
      attachments: [
        {
          content: {
            '@context': 'https://schema.org',
            '@type': 'ReviewAction',
            actionStatus: 'PotentialActionStatus',
            description: 'Great! Please rate your experience.',
            resultReview: {
              '@type': 'Review',
              reviewRating: {
                '@type': 'Rating',
                description: ['Bad', 'Poor', 'Average', 'Good', 'Excellent'],
                'ratingValue-input': {
                  '@type': 'PropertyValueSpecification',
                  valueName: 'rate'
                }
              }
            },
            target: {
              '@type': 'EntryPoint',
              actionPlatform: 'https://directline.botframework.com',
              urlTemplate: 'ms-directline-postback:?valuetype=application/json&value=%7B%22rate%22%3A%22{rate}%22%7D'
            }
          },
          contentType: 'application/ld+json'
        }
      ],
      timestamp: new Date().toISOString()
    }
  ],
  null,
  2
);

const SAMPLE_TRANSCRIPT_JSON_5 = JSON.stringify(
  [
    {
      from: {
        role: 'bot'
      },
      text: 'Great! Please rate your experience.',
      type: 'message',
      entities: [
        {
          content: {
            '@context': 'https://schema.org',
            '@type': 'ReviewAction',
            actionStatus: 'PotentialActionStatus',
            resultReview: {
              '@type': 'Review',
              reviewRating: {
                '@type': 'Rating',
                description: ['Bad', 'Poor', 'Average', 'Good', 'Excellent'],
                'ratingValue-input': {
                  '@type': 'PropertyValueSpecification',
                  valueName: 'rate'
                }
              }
            },
            target: {
              '@type': 'EntryPoint',
              actionPlatform: 'https://directline.botframework.com',
              urlTemplate: 'ms-directline://messageback'
            }
          },
          contentType: 'application/ld+json'
        }
      ],
      timestamp: new Date().toISOString()
    }
  ],
  null,
  2
);

function parseTranscript(value: string): false | [] {
  try {
    const parsedTranscript = JSON.parse(value) as [];

    if (Array.isArray(parsedTranscript)) {
      return parsedTranscript;
    }
  } catch (err) {}

  return false;
}

const TranscriptDialog: FC = () => {
  const [savedContent, setSavedContent] = useTranscriptDialogContent();
  const [, setVisible] = useTranscriptDialogVisible();

  const [editedContent, setEditedContent] = useState(() => {
    const transcript = parseTranscript(savedContent);

    return transcript && transcript.length ? JSON.stringify(transcript, null, 2) + '\n' : '';
  });

  const handleGenerateClick = useCallback<() => void>(() => {
    const loremIpsum = new LoremIpsum();
    const nextEditedContent = [];
    let timestamp = new Date();

    for (let i = 0; i < GENERATE_COUNT; i++) {
      nextEditedContent.unshift({
        from: {
          role: i % 2 ? 'bot' : 'user'
          // role: 'bot'
        },
        id: `a-${GENERATE_COUNT - i}`,
        text: `${GENERATE_COUNT - i}: ${loremIpsum.generateParagraphs(1)}`,
        timestamp: timestamp.toISOString(),
        type: 'message'
      });

      timestamp.setUTCSeconds(timestamp.getUTCSeconds() - 301);
    }

    setEditedContent(JSON.stringify(nextEditedContent, null, 2));
  }, [setEditedContent]);

  const handleUploadHARFile = useCallback<(content: ArrayBuffer | null | string) => void>(content => {
    if (typeof content === 'string') {
      const chatHistory = parseChatHistoryFromHARFile(content);

      setEditedContent(chatHistory ? JSON.stringify(chatHistory, null, 2) : '');
    }
  }, []);

  const handleLoadSampleButtonClick = useCallback<MouseEventHandler>(
    () => setEditedContent(SAMPLE_TRANSCRIPT_JSON + '\n'),
    [setEditedContent]
  );

  const handleLoadSample2ButtonClick = useCallback<MouseEventHandler>(
    () => setEditedContent(SAMPLE_TRANSCRIPT_JSON_2 + '\n'),
    [setEditedContent]
  );

  const handleLoadSample3ButtonClick = useCallback<MouseEventHandler>(
    () => setEditedContent(SAMPLE_TRANSCRIPT_JSON_3 + '\n'),
    [setEditedContent]
  );

  const handleLoadSample4ButtonClick = useCallback<MouseEventHandler>(
    () => setEditedContent(SAMPLE_TRANSCRIPT_JSON_4 + '\n'),
    [setEditedContent]
  );

  const handleLoadSample5ButtonClick = useCallback<MouseEventHandler>(
    () => setEditedContent(SAMPLE_TRANSCRIPT_JSON_5 + '\n'),
    [setEditedContent]
  );

  const handleSaveButtonClick = useCallback<() => void>(() => {
    if (editedContent) {
      const transcript = parseTranscript(editedContent);

      if (!transcript) {
        return;
      }

      setSavedContent(transcript.length ? JSON.stringify(transcript, null, 2) : '');
      setVisible(false);
    } else {
      setSavedContent('');
      setVisible(false);
    }
  }, [editedContent, setSavedContent, setVisible]);

  const handleTextAreaChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    ({ target: { value } }) => setEditedContent(value),
    [setEditedContent]
  );

  const handleTextAreaKeyDown = useCallback<KeyboardEventHandler>(
    event => {
      const { ctrlKey, key } = event;

      if (ctrlKey && (key === 'S' || key === 's')) {
        event.preventDefault();

        handleSaveButtonClick();
      } else if (key === 'Escape') {
        event.preventDefault();

        setVisible(false);
      }
    },
    [handleSaveButtonClick, setVisible]
  );

  const isValid = useMemo(() => {
    if (!editedContent) {
      return true;
    }

    return !!parseTranscript(editedContent);
  }, [editedContent]);

  return (
    <div className={cx(DIALOG_CSS, 'transcript-dialog')}>
      <div className="transcript-dialog__button-bar">
        <button disabled={!isValid} onClick={handleSaveButtonClick} type="button">
          Save (CTRL+S)
        </button>
        &nbsp;
        <button disabled={!!editedContent} onClick={handleLoadSampleButtonClick} type="button">
          Load sample
        </button>
        &nbsp;
        <button disabled={!!editedContent} onClick={handleLoadSample2ButtonClick} type="button">
          Load sample 2 (Citation)
        </button>
        &nbsp;
        <button disabled={!!editedContent} onClick={handleLoadSample3ButtonClick} type="button">
          Load sample 3 (VoteAction)
        </button>
        &nbsp;
        <button disabled={!!editedContent} onClick={handleLoadSample4ButtonClick} type="button">
          Load sample 4 (CSAT v1)
        </button>
        &nbsp;
        <button disabled={!!editedContent} onClick={handleLoadSample5ButtonClick} type="button">
          Load sample 5 (CSAT v2)
        </button>
        &nbsp;
        <button disabled={!!editedContent} onClick={handleGenerateClick} type="button">
          Generate lorem ipsum
        </button>
        &nbsp;
        <FileUploadButton onUpload={handleUploadHARFile}>Upload HAR file</FileUploadButton>
      </div>
      <div className="transcript-dialog__body">
        <textarea
          autoFocus={true}
          className={cx('transcript-dialog__text-area', { 'transcript-dialog__text-area--invalid': !isValid })}
          onChange={handleTextAreaChange}
          onKeyDown={handleTextAreaKeyDown}
          placeholder={`Please paste transcript in JSON format.\n\n${SAMPLE_TRANSCRIPT_JSON}`}
          spellCheck={false}
          title="Transcript in JSON format"
          value={editedContent}
        />
      </div>
    </div>
  );
};

export default TranscriptDialog;
