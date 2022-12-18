import React from "react";
import JoinLink from "../../../pages/MultiLogin/JoinLink";
import SocialLoginItem from "../SocialLoginItem/SocialLoginItem";
import { LoginArticle, SocialLoginWrap } from "./LoginModalStyle";

export default function LoginModal({ splashLoading }) {
  return (
    <>
      <LoginArticle splashLoading={splashLoading}>
        <h2 className="visually_hidden">소셜로그인 및 회원가입</h2>
        <SocialLoginWrap>
          <SocialLoginItem position={-67} socialName="카카오톡" />
          <SocialLoginItem position={-34} socialName="구글" />
          <SocialLoginItem position={-5} socialName="페이스북" />
        </SocialLoginWrap>
        <JoinLink />
      </LoginArticle>
    </>
  );
}
