// src/components/Privacy/OperationPolicyComponent.tsx
'use client';
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';

// 공통 스타일 정의
const SectionTitle = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: 10,
});

const SectionSubTitle = styled(Typography)({
  fontWeight: 'bold',
  marginTop: 40,
  marginBottom: 10,
});

const SectionParagraph = styled(Typography)({
  marginBottom: 10,
  marginLeft: 10,
});

const IndentedBox = styled(Box)({
  paddingLeft: 10,
  marginBottom: 10,
});

const OperationPolicyComponent: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <SectionTitle variant="h4" sx={{ mb: 4 }}>
          Operating Policy
        </SectionTitle>

        <SectionSubTitle variant="h6">Service Operating Policy</SectionSubTitle>
        <SectionParagraph>
          This operating policy outlines the standards for operating Collegenie
          AI (hereinafter referred to as the "Company" or StudyOLA Store) in
          order to consistently address potential issues that may arise within
          the services provided by StudyOLA Store (hereinafter referred to
          collectively as the "Service"). This policy also stipulates the
          detailed matters that members must adhere to.
        </SectionParagraph>
        <SectionParagraph>
          Failure to comply with this operating policy may result in
          disadvantages in the use of all services provided by the Company, so
          please read it carefully. The terms used in this operating policy have
          the same meaning as those in the Terms of Service. The Company strives
          to establish a reasonable operating policy through continuous exchange
          of opinions with members to improve policies related to the Service
          and will notify such changes at least 7 days in advance through
          service notices.
        </SectionParagraph>

        <SectionSubTitle variant="h6">
          Members' Rights and Obligations
        </SectionSubTitle>
        <SectionParagraph>
          1. <strong>Members' Rights</strong>
        </SectionParagraph>
        <IndentedBox>
          <SectionParagraph>
            1. Members can make various inquiries about the Service through
            support@essayfit.com.
          </SectionParagraph>
        </IndentedBox>
        <SectionParagraph>
          2. <strong>Members' Obligations</strong>
        </SectionParagraph>
        <IndentedBox>
          <SectionParagraph>
            1. Members must not engage in activities that violate laws, the
            Terms of Service, the operating policy, or interfere with other
            members' use of the Service. If such obligations are violated,
            service use restrictions may be imposed without separate notice
            according to the Company's internal regulations.
          </SectionParagraph>
          <SectionParagraph>
            2. Members must frequently check the Terms of Service, operating
            policies, and notices on the Company’s website, and the Company is
            not responsible for any issues arising from failure to check these.
          </SectionParagraph>
          <SectionParagraph>
            3. If members infringe on the copyrights or intellectual property
            rights of the Company or other third parties, damage reputations,
            interfere with business operations, or violate other relevant laws,
            they may face service use restrictions and may bear civil and
            criminal liability according to relevant laws.
          </SectionParagraph>
        </IndentedBox>

        <SectionSubTitle variant="h6">Service Use Restrictions</SectionSubTitle>
        <SectionParagraph>
          A. <strong>Activities Subject to Use Restrictions</strong>
        </SectionParagraph>
        <IndentedBox>
          <SectionParagraph>
            1. <strong>Illegal Activities</strong>
          </SectionParagraph>
          <IndentedBox>
            <SectionParagraph>
              1. Promoting illegal or gambling sites
            </SectionParagraph>
            <SectionParagraph>
              2. Selling or promoting illegal products
            </SectionParagraph>
            <SectionParagraph>
              3. Installing or distributing malicious code, viruses, etc., that
              hinder members' normal use of the Service or attempt to steal
              members' personal information
            </SectionParagraph>
            <SectionParagraph>
              4. Abusing or exploiting bugs/system errors in the Service
            </SectionParagraph>
            <SectionParagraph>
              5. Sharing others' copyrighted materials (e.g., broadcasts, music,
              movies, comics) without consent
            </SectionParagraph>
            <SectionParagraph>
              6. Providing information or methods to obtain others' copyrighted
              materials through illegal means (e.g., links, free downloads,
              private servers, CD key sharing, unauthorized programs/sites)
            </SectionParagraph>
            <SectionParagraph>
              7. Infringing on others' trademarks, designs, etc., without
              authorization
            </SectionParagraph>
            <SectionParagraph>
              8. Unauthorized use of other people's posts (in whole or part),
              photos, images (plagiarism)
            </SectionParagraph>
            <SectionParagraph>
              9. Writing content that includes others' personal information
            </SectionParagraph>
            <SectionParagraph>
              10. Stealing or using others' personal information, accounts,
              devices to sign up for or use the Service
            </SectionParagraph>
            <SectionParagraph>
              11. Sharing, selling, or transferring personal information, login
              information (account ID, password, etc.)
            </SectionParagraph>
            <SectionParagraph>
              12. Other activities deemed illegal
            </SectionParagraph>
          </IndentedBox>
          <SectionParagraph>
            2. <strong>Obscene or Harmful Activities to Minors</strong>
          </SectionParagraph>
          <IndentedBox>
            <SectionParagraph>
              1. Sharing information related to prostitution
            </SectionParagraph>
            <SectionParagraph>
              2. Glorifying or explicitly describing abnormal sexual behavior
            </SectionParagraph>
            <SectionParagraph>
              3. Conducting activities that significantly offend general public
              sexual morality with provocative and offensive sexual expressions
            </SectionParagraph>
            <SectionParagraph>
              4. Conducting activities that may cause personal discomfort,
              cruelty, or disgust through anti-human or anti-personal content
            </SectionParagraph>
            <SectionParagraph>
              5. Describing minors or adolescents as objects of sexual pleasure
              in direct and specific ways
            </SectionParagraph>
            <SectionParagraph>
              6. Engaging in activities that involve or promote sexual crimes
              against minors or adolescents
            </SectionParagraph>
            <SectionParagraph>
              7. Describing excessive nudity and obscene behavior in content
              accessible to all members
            </SectionParagraph>
            <SectionParagraph>
              8. Encouraging anti-human activities or violating the laws
              protecting minors and adolescents
            </SectionParagraph>
          </IndentedBox>
          <SectionParagraph>
            3. <strong>Copyright Infringement</strong>
          </SectionParagraph>
          <IndentedBox>
            <SectionParagraph>
              1. Infringing copyrighted materials reported by the copyright
              holder
            </SectionParagraph>
            <SectionParagraph>
              2. Copying, distributing, or commercially using information
              obtained through the Company's Service without proper authority or
              the Company's consent
            </SectionParagraph>
            <SectionParagraph>
              3. Other activities that infringe copyrights
            </SectionParagraph>
          </IndentedBox>
          <SectionParagraph>
            4. <strong>Violation of Public Order and Morals</strong>
          </SectionParagraph>
          <IndentedBox>
            <SectionParagraph>
              1. Writing or describing content that is offensive or violent
            </SectionParagraph>
            <SectionParagraph>
              2. Using inappropriate language in posts, comments, or nicknames
            </SectionParagraph>
            <SectionParagraph>
              3. Intentionally slandering others
            </SectionParagraph>
            <SectionParagraph>
              4. Describing or inducing self-harm/suicide/murder
            </SectionParagraph>
            <SectionParagraph>
              5. Other activities violating public order and morals
            </SectionParagraph>
          </IndentedBox>
          <SectionParagraph>
            5. <strong>Spam Activities</strong>
          </SectionParagraph>
          <IndentedBox>
            <SectionParagraph>
              1. Repeatedly writing the same content
            </SectionParagraph>
            <SectionParagraph>
              2. Writing commercial content for advertising and promotional
              purposes, including friend requests for other services
            </SectionParagraph>
            <SectionParagraph>
              3. Inducing sign-ups for commercial promotions
            </SectionParagraph>
            <SectionParagraph>4. Other spam activities</SectionParagraph>
          </IndentedBox>
          <SectionParagraph>
            6. <strong>Discrimination or Incitement to Conflict</strong>
          </SectionParagraph>
          <IndentedBox>
            <SectionParagraph>
              1. Writing content that discriminates against or incites prejudice
              based on gender, religion, disability, age, social status, race,
              region, occupation, etc.
            </SectionParagraph>
            <SectionParagraph>
              2. Writing politically provocative content
            </SectionParagraph>
            <SectionParagraph>
              3. Other activities inciting discrimination and conflict
            </SectionParagraph>
          </IndentedBox>
          <SectionParagraph>
            7. <strong>Other</strong>
          </SectionParagraph>
          <IndentedBox>
            <SectionParagraph>
              1. Activities that disrupt or negatively affect the operation of
              the Service
            </SectionParagraph>
            <SectionParagraph>
              2. Impersonating the Company, other companies, or individuals
              related to copyright holders in posts or comments, intending to
              misuse the Service for purposes other than proper use
            </SectionParagraph>
            <SectionParagraph>3. Other prohibited activities</SectionParagraph>
          </IndentedBox>
        </IndentedBox>

        <SectionSubTitle variant="h6">
          B. Types of Use Restrictions
        </SectionSubTitle>
        <IndentedBox>
          <SectionParagraph>
            1. <strong>Actual Service Use Restrictions</strong>
          </SectionParagraph>
          <IndentedBox>
            <SectionParagraph>
              1. If members engage in activities listed under A or violate the
              Terms of Service, the use of the Service may be temporarily or
              permanently restricted, in whole or in part.
            </SectionParagraph>
            <SectionParagraph>
              2. Inappropriate posts and comments violating this operating
              policy may be restricted from being exposed within the Service,
              and depending on the number of actions and the severity of the
              issues, service or account use may be restricted.
            </SectionParagraph>
          </IndentedBox>
          <SectionParagraph>
            2. <strong>Service Use Reporting System</strong>
          </SectionParagraph>
          <IndentedBox>
            <SectionParagraph>
              1. Members can report posts that violate relevant laws, the Terms
              of Service, or this operating policy to the Company at any time.
            </SectionParagraph>
            <SectionParagraph>
              2. When reporting, the URL of the post to be reported and the
              reason for restricting the post must be submitted. The submitted
              post URL and report reason will be delivered to the Company’s
              staff, who will carefully review the restriction.
            </SectionParagraph>
            <SectionParagraph>
              3. If the post is not deemed to clearly violate relevant laws, the
              Terms of Service, or this operating policy, no action may be
              taken.
            </SectionParagraph>
            <SectionParagraph>
              4. Even if a decision has been made on a report, it may be changed
              if a subsequent court ruling or administrative authority's
              disposition reveals an issue with the previous decision.
            </SectionParagraph>
            <SectionParagraph>
              5. During the review process of the report, not only actions
              regarding the post but also use restrictions on the member account
              may occur. In such cases, the member’s service use history,
              violation history of this operating policy, relevant laws, the
              Terms of Service, and this operating policy will be
              comprehensively considered.
            </SectionParagraph>
          </IndentedBox>
        </IndentedBox>

        <SectionSubTitle variant="h6">
          C. Jurisdiction and Application
        </SectionSubTitle>
        <IndentedBox>
          <SectionParagraph>
            1. <strong>Jurisdiction</strong>
          </SectionParagraph>
          <IndentedBox>
            <SectionParagraph>
              1. All disputes arising from this Service shall be governed by the
              courts of the Republic of Korea. This means that any disputes
              between the user and the Company will be resolved according to the
              laws of the Republic of Korea.
            </SectionParagraph>
          </IndentedBox>
          <SectionParagraph>
            2. <strong>Application of Terms</strong>
          </SectionParagraph>
          <IndentedBox>
            <SectionParagraph>
              1. The use of this Service is defined and regulated according to
              the terms of StudyOLA Store. By agreeing to these terms, users
              agree to use the Service as defined by these terms.
            </SectionParagraph>
          </IndentedBox>
        </IndentedBox>

        <SectionParagraph sx={{ textAlign: 'center', mt: 3 }}>
          This operating policy applies from July 29, 2024.
        </SectionParagraph>
      </Box>
    </Container>
  );
};

export default OperationPolicyComponent;
