import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  position: relative;
  background-image: linear-gradient(rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  border-radius: 8px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  background-position: center center;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: white;
  margin-top: 40px;
`;

const ContentColumn = styled.div``;

const Title = styled.span`
  font-size: 24px;
  font-weight: 900;
  display: block;
  margin-bottom: 8px;
  color: ${(props) => props.color};
`;

const TagContainer = styled.div`
  background-color: ${(props) => props.tagBg};
  color: ${(props) => props.tagColor};
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 3px;
  width: 90px;
  border-radius: 3px;
  text-align: center;
  color: white;
`;

const TagText = styled.div``;

const IconContainer = styled.div`
  cursor: pointer;
  color: ${(props) => props.color};
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CTA = styled.span`
  display: block;
  margin-top: 20px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 500;
  i {
    margin-left: 10px;
  }
`;

const Card12 = ({
  title,
  titleColor = "white",
  tag,
  tagBg = "brown",
  borderBottomColor,
  tagColor = "white",
  iconName,
  iconSize = 1,
  iconColor = "white",
  bgPhoto,
  cta,
  direct
}) => (
  <Grid item xs={12} lg={4}>
    <Container bgPhoto={bgPhoto} borderBottomColor={borderBottomColor}>
      {tag && (
        <Top>
          <TagContainer tagBg={tagBg} tagColor={tagColor}>
            <TagText>{tag}</TagText>
          </TagContainer>
          {iconName && (
            <IconContainer color={iconColor}>
              <i className={`${iconName} fa-${iconSize}x`} />
            </IconContainer>
          )}
        </Top>
      )}
      {title && (
        <Content>
          <ContentColumn>
            {title && <Title color={titleColor}>{title}</Title>}
            {cta && (
              <NavLink
                to={`/${direct}`}
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "16px",
                  marginTop: "20px",
                }}
              >
                View
              </NavLink>
            )}
          </ContentColumn>
        </Content>
      )}
    </Container>
  </Grid>
);

Card12.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  tag: PropTypes.string,
  tagColor: PropTypes.string,
  tagBg: PropTypes.string,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  bgPhoto: PropTypes.string,
  cta: PropTypes.string,
  borderBottomColor: PropTypes.string,
  direct:PropTypes.string
};

export default Card12;
