import React, { useEffect, useLayoutEffect, useState } from "react";
import PostCardBtns from "./PostCardBtns";
import user_img_small from "../../assets/images/user_img_small.svg";
import ModalContainer from "../Modal/ModalContainer";
import ModalList from "../Modal/ModalList";
import AlertModal from "../Modal/AlertModal";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { handleDelete } from "../../utils/handleDelete";
import { handleDeclaration } from "../../utils/handleDeclaration";
import * as S from "./style";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import LocationInfo from "../LocationInfo";

export default function PostCard({
  id,
  author,
  content,
  createdAt,
  image,
  commentCount,
  heartCount,
  hearted,
  setData,
}) {
  const date = new Date(createdAt);
  const dateOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const createAtFormat = new Intl.DateTimeFormat("ko-KR", dateOptions).format(
    date
  );
  const navigate = useNavigate();
  const {
    isModal,
    isMyContent,
    isModalAlert,
    handleModal,
    handleAlert,
    handlCloseClick,
  } = useModal(author.accountname);
  const url = `${process.env.REACT_APP_API_KEY}/post/${id}`;
  const declarationUrl = `${process.env.REACT_APP_API_KEY}/${id}/report`;
  const handleDel = () => {
    setData((prev) => prev.filter((post) => post.id !== id));
  };
  return (
    <>
      <S.PostCardList>
        <Link to={`/profile/${author.accountname}`}>
          <S.PostCardUserImg
            src={
              author.image.includes("Ellipse") ? user_img_small : author.image
            }
          />
        </Link>
        <S.PostCardContentContainer>
          <S.PostCardUserName>{author.username}</S.PostCardUserName>
          <S.PostCardUserId>&#64;{author.accountname}</S.PostCardUserId>
          {content.includes('"map":{') ? (
            <S.PostCardContentTxt>
              {JSON.parse(content).content}
            </S.PostCardContentTxt>
          ) : (
            <S.PostCardContentTxt>{content}</S.PostCardContentTxt>
          )}
          {image && (
            <S.SwiperStyle pagination={true} modules={[Pagination]}>
              {image.split(",").map((img) => (
                <SwiperSlide>
                  <S.PostCardContentImg src={img} alt="게시물 이미지" />
                </SwiperSlide>
              ))}
            </S.SwiperStyle>
          )}
          {content.includes('"map":{') && (
            <LocationInfo mapSelect={JSON.parse(content).map} />
          )}

          <PostCardBtns
            postkey={id}
            commentCount={commentCount}
            heartCount={heartCount}
            hearted={hearted}
          />
          <S.PostCardTime>{createAtFormat} </S.PostCardTime>
        </S.PostCardContentContainer>
        <S.PostCardVertical onClick={handleModal}>
          <span className="ir">더보기 버튼</span>
        </S.PostCardVertical>
      </S.PostCardList>
      {isModal && (
        <ModalContainer onClick={handleModal}>
          {isMyContent ? (
            <>
              <ModalList onClick={(e) => handleAlert(e, "삭제모달")}>
                삭제
              </ModalList>
              <ModalList
                onClick={() => {
                  navigate(`/postedit/${id}`, {
                    state: {
                      content: content,
                      image: image,
                    },
                  });
                }}
              >
                수정
              </ModalList>
            </>
          ) : (
            <ModalList onClick={(e) => handleAlert(e, "신고모달")}>
              신고하기
            </ModalList>
          )}
        </ModalContainer>
      )}
      {isModalAlert !== false ? (
        isModalAlert === "삭제모달" ? (
          <AlertModal
            title="게시글을 삭제할까요?"
            submitText="삭제"
            onCloseClick={handlCloseClick}
            onSubmitClick={(e) =>
              handleDelete(e, handlCloseClick, url, handleDel)
            }
          />
        ) : (
          <AlertModal
            title="게시글을 신고하시겠어요?"
            submitText="신고"
            onCloseClick={handlCloseClick}
            onSubmitClick={(e) => {
              handleDeclaration(e, handlCloseClick, declarationUrl, id);
            }}
          />
        )
      ) : null}
    </>
  );
}
