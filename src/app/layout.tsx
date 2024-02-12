'use client';
import { ModalProvider } from 'react-modal-hook';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ModalProvider>{children} </ModalProvider>
      </body>
    </html>
  );
}
