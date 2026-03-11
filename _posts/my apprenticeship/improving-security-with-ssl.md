---
title: "Web Security with HTTPS"
date: "2016-02-17"
author:
  name: Brian Nystrom
  picture: /assets/blog/authors/brian.jpeg
coverImage: /assets/blog/preview/cover.jpg
ogImage:
  url: /assets/blog/preview/cover.jpg
excerpt: "A look at how HTTPS and SSL/TLS work under the hood — from the TCP handshake to certificate authorities — and why every web app handling sensitive data should use them."
---

When we're typing away at the computer creating working features on a new app, thinking about all the security flaws will often times become an afterthought. But if you're planning on creating a web application that deals with senstive user data, you should at least serve your clients over a HTTP Secure connection.

## Secure Sockets Layer

Although it's more commonly called HTTPS, it is really just a HTTP connection that is send through a Secure Sockets Layer (SSL). Secure Sockets Layer is a security protocol that allows for two computers to send encrypted data over a network. It is designed to prevent [Man-In-The-Middle](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) attacks.

Allowing your users to use your application over HTTPS doesn't just put a fancy green lock next to the URL in your browser, most of the action is under the hood. However,  when you see the green lock, not only is all data sent from the browser to the server encrypted, but that the website has been authenticated by a certificate authority.

#### Data Security

When connected to a server through HTTPS, any form data you send off will be encrypted in it's entirety. Before the browser sends off any data, it will first negotiate the details of the data exchange with the server under a TCP handshake. This is where the browser will send SYN/ACK packets to first establish a connection, then the client and server will, quite literally, say "Hello" to each other, by sending a ClientHello packets to the server to negotiate the encryption details.

![Handshake](/images/ssl-handshake.png)

In the first **ClientHello** packet that is sent, the client will give the server some information.

1. Highest supported TLS/SSL version
2. Random Generated Data to create encryption key
3. List of supported Cipher Suites

From this information, the server will respond back with a **ServerHello** packet.

1. Highest supported TLS/SSL version
2. Chosen cipher suite to use
3. Session ID
4. Server Certificate

From these two packets, the Client and Server have agreed upon an encryption algorithm and a specific TLS/SSL protocol version to use. But before the client can continue, the Client must verify the Server's certificate. Think of a certificate as a digital document that is says the server can be trusted. The certificate contains the servers name, the public key, and the trusted Certificate Authority. This information will allow the client to generate session keys to encrypt and decrypt the data exchange.

#### Authentication

On the web, authentication works having a digital certificate issued by a Certificate Authority. In order to obtain a digital certificate you must send a Certificat Signing Request containing some information about your server and domain. It is then verified by a Certificate Authority who makes sure that the information is correct. They will often do this by sending a verification e-mail to an e-mail address that is associated with the domain.

You don't always have to go to a Certificate Authority to get a digital certificate. It is entirely possible to create a digital certificate by signing a certificate yourself. This is a free alternative that will encrypt the data, but you won't have any trusted authority vouching for your site. The problem with this is that the browser also makes checks on the servers certificate to make sure it's valid. If the certificate can't be verified by a list of CA's the browser knows about, you might see an error pop up like so

![Invalid Certificate](/images/not_trusted_certificate.png)

Setting up a secure portal from the browser and your application doesn't require too much extra coding, just some extra configuration that could do on your lunch break. And although simply setting up SSL won't get rid of all your security issues, it is just one simple thing you can do make it harder for the bad guys to take advantage of vulnerabilities.
