import Styled from 'styled-components';
import React, { useState } from "react";
import Head from "next/head";

const NewProduct = () =>{
    const [text, setText] = useState<string>("자바스크립트");
    return(
        <>
            <div> 
                <div>
                    {/* 타이틀 들어갈 자리*/}
                    새로운 NFT 발행하기
                </div>
                <div>
                    {/* 파일 업로드(조금 더 작은 글씨) */}
                    파일 업로드
                </div>
                <div>
                    {/* description */}
                    NFT에 넣을 이미지/영상 파일을 업로드해 주세요. 최대 10MB까지 업로드할 수 있으며, 지원하는 파일 포맷은 아래와 같습니다. &nbsp;
                    - 이미지: PNG, JPEG, GIF, WEBP (가로 세로 사이즈 600px 이상) &nbsp;
                    -영상: MP4(가로 세로 사이즈 600px 이상) &nbsp;

                </div>
                <div>
                    <div>
                        {/* 점선 프레임 */}
                        {/* 파일 선택 버튼 */}
                    </div>
                    <div>
                        <div>
                            미리 보기
                        </div>
                        <div>
                            <div>
                            {/* 미리보기 이미지 */}
                            </div>
                            <div>
                                <div>NFT 이름</div>
                                <div>Created by {/* 로그인한 사람 아이디 */}</div>
                            </div>
                            <div>{/* 프로필 이미지*/}</div>
                        </div>
                        <div>
                            * 영상을 업로드한 경우, 이미지에 마우스를 가져다 대면 영상 미리보기로 변경됩니다.
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        배경색
                    </div>
                    <div>
                        NFT 배경색을 선택해주세요. 아래 컬러칩을 눌러 색을 지정하거나, 컬러 코드를 직접 입력할 수 있습니다.
                    </div>
                    <div>
                        <div>
                            {/* 컬러칩 */}
                        </div>
                        <input type = "text" />
                    </div>
                </div>
                <div>
                    <div>
                        이름
                    </div>
                    <input type = "text" />
                </div>
                <div>
                    <div>
                        설명
                    </div>
                    <textarea />
                </div>
                <div>
                    <div>
                        <input type="checkbox"/> 
                        본인은 NFT 발행을 위해 아래 정보를 수집 및 이용하는 것에 동의합니다.
                    </div>
                    <div>
                        <div>
                            - 수집항목: NFT이름, 설명, 파일(이미지 등)
                        </div>
                        <div>
                            - 보유 및 이용기간: 영구 (규정위반, 요청 시 파기)
                        </div>
                        <div>
                            - 수집목적: NFT 발행 및 관리
                        </div>
                        <div>
                            - 동의를 거부할 경우 NFT를 발행할 수 없습니다.
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="checkbox"/> 
                        본인은 아래 유의사항을 꼼꼼히 확인하였으며, 이를 준수하는데 동의합니다.
                    </div>
                    <div>
                        <p>
                            1. 본인은 제3자의 지적재산권, 인권, 개인정보 등 타인의 권리를 침해하지 않습니다.
                        </p>
                        <p>
                            2. 본인은 본인의 개인정보를 활용하는 경우 본인의 개인정보가 제3자에게 공개, 활용, 제공 등이 될 수 있음을 인지하며 이에 동의합니다.
                        </p>
                        <p>
                            3. 본인은 이용약관 및 운영정책에 반하는 NFT를 발행하지 않으며 발행하는 NFT에 대한 모든 책임은 본인에게 있음을 확인하고 동의합니다.
                        </p>
                        <p>
                            4. 본인은 NFT에 부적절한 이미지나 영상이 포함될 경우 고지 없이 삭제될 수 있음을 인지하며 이에 동의합니다.
                        </p>
                    </div>
                    
                </div>
                <div>
                {/* buttons */}
                    
                </div>
                
            </div>
        </>
    )
}

export default NewProduct
