---
title: Courier
publishedAt: 2022-01-24
description: Local Network Chat App for Desktop
author: rubbie-kelvin
categories:
  - programming
  - python
  - utilities
mainImage: /images/3075fbf0b00cae8af35ac2124e4199549f549bfc-1522x1043.png
---

## Overview

Courier is a desktop application written in Python and Qt for data transfer between machines connected to the same network. The connection uses WebSockets to send text and binary data.WebSockets is a web technology providing full-duplex communications channels over a single TCP connection. The WebSocket protocol was standardized by the IETF as RFC 6455 in 2011.

## Application Flow

![](/images/6901200d50e0664b3a94a280ba7ed1abb85fa397-2048x1457.png)

The whole process begins at the server application, the server searches for an incoming connection, waiting for a client to connect. Once a client is connected, it is handled in another thread called the client thread. While repeating the process in the main thread, the server handles the client thread in the background. Login password is collected from the handled client, which is used to initialize the handshake process. If the handshake is unsuccessful, the client is purges off the network, ending the thread. If the handshake is successful, (password is correct), a client profile is created on the server. This allows other clients to identify the specific client, enabling direct messaging and file transfer from one client to another.

When a client sends a message it is bundled with meta-data that tells which client the message is coming from, what client the message is sent to and also some extra information. The message is sent to the server, which is then parsed in the server application. The server identified the receiver client address, and then sends the message.

For binary data, the server helps initialize a direct client-server relationship between the clients. which enables faster file transfer without data passing through a middle man.

## The User interface

![](/images/d4fc99b07377647efe23e2722eda1d50101e5410-1152x700.png)

The application is designed as a single screen application with 3 split sections. The first section contains the contact list for easy handling of contact profiles. Contact profiles are structured data in the server application that holds details about connected client applications. This detail is sent by a single client application to the server, which is then shared to other client applications for profile update. The second section contains the main functionality, the chat space for sending messages and files. The third section is used to manage multiple view like settings, user profile, and menu. For ease of user & wide area on the second section, the third section is design to be closable.

## Python & Qt Qml

![](/images/d25a523739ce993471b2448d59b3ac8dcbe3276f-512x233.gif)

Python is known for its ease of use & its role in fast development time. Thankfully, Qt's binging for python makes building this application in record time possible. Qt's QtQuick UI technology makes it very easy to create modern interfaces, hence, being a very good choice for the project.
