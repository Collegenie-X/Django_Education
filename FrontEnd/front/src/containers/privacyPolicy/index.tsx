'use client';
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/system'; // 수정된 import 경로

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

const PrivacyPolicy: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <SectionTitle variant="h4" sx={{ mb: 4 }}>
          Privacy Policy
        </SectionTitle>

        <SectionSubTitle variant="h6">
          Article 1 (Purpose and Consent)
        </SectionSubTitle>
        <SectionParagraph>
          &nbsp; Collegenie AI (hereinafter referred to as the "Company") values
          the personal information of members and complies with the "Personal
          Information Protection Act," "Act on Promotion of Information and
          Communications Network Utilization and Information Protection," and
          other relevant laws. This Privacy Policy explains how the Company
          collects, uses, and manages the personal information of members in
          connection with the services provided through StudyOLA Store
          (hereinafter referred to as the "Service").
        </SectionParagraph>
        <SectionParagraph>
          By using the StudyOLA Store service, members agree to this Privacy
          Policy and the relevant terms and conditions.
        </SectionParagraph>

        <SectionSubTitle variant="h6">
          Article 2 (Items of Personal Information Collected and Collection
          Method)
        </SectionSubTitle>
        <SectionParagraph>
          1. Items of Personal Information Collected
        </SectionParagraph>
        <IndentedBox>
          <SectionParagraph>
            <strong>Mandatory Items:</strong> Name, Email Address
          </SectionParagraph>
          <SectionParagraph>
            <strong>Payment Information:</strong> Payment method information
            (when payment is made through Toss Payments)
          </SectionParagraph>
        </IndentedBox>
        <SectionParagraph>2. Collection Method</SectionParagraph>
        <IndentedBox>
          <SectionParagraph>
            Information directly entered by the member during the sign-up and
            service use process
          </SectionParagraph>
          <SectionParagraph>
            Payment information collected through Toss Payments
          </SectionParagraph>
        </IndentedBox>

        <SectionSubTitle variant="h6">
          Article 3 (Purpose of Collecting and Using Personal Information)
        </SectionSubTitle>
        <SectionParagraph>
          The Company uses the collected personal information for the following
          purposes:
        </SectionParagraph>
        <IndentedBox>
          <SectionParagraph>
            1. Service Provision and Management
          </SectionParagraph>
          <IndentedBox>
            <SectionParagraph>
              Member registration and management
            </SectionParagraph>
            <SectionParagraph>
              Provision of services, content, and specific personalized services
            </SectionParagraph>
            <SectionParagraph>
              Identity verification and age confirmation
            </SectionParagraph>
          </IndentedBox>
          <SectionParagraph>2. Payment Processing</SectionParagraph>
          <IndentedBox>
            <SectionParagraph>
              Processing payments through Toss Payments and providing related
              services
            </SectionParagraph>
          </IndentedBox>
          <SectionParagraph>3. Customer Support</SectionParagraph>
          <IndentedBox>
            <SectionParagraph>
              Responding to member inquiries and delivering notices
            </SectionParagraph>
          </IndentedBox>
          <SectionParagraph>4. Marketing and Advertising</SectionParagraph>
          <IndentedBox>
            <SectionParagraph>
              Service improvement and development of new services
            </SectionParagraph>
            <SectionParagraph>
              Providing event and advertising information (with the member's
              consent)
            </SectionParagraph>
          </IndentedBox>
        </IndentedBox>

        <SectionSubTitle variant="h6">
          Article 4 (Retention and Use Period of Personal Information)
        </SectionSubTitle>
        <SectionParagraph>
          &nbsp; The Company retains and uses the personal information of
          members in principle until the member withdraws. However, the
          following information will be retained for the specified periods for
          the reasons stated:
        </SectionParagraph>
        <IndentedBox>
          <SectionParagraph>
            <strong>Records related to contracts or withdrawals:</strong> 5
            years <br /> (in accordance with the Act on Consumer Protection in
            Electronic Commerce)
          </SectionParagraph>
          <SectionParagraph>
            <strong>Records related to payment and supply of goods:</strong> 5
            years <br /> (in accordance with the Act on Consumer Protection in
            Electronic Commerce)
          </SectionParagraph>
          <SectionParagraph>
            <strong>Records related to consumer complaints or disputes:</strong>
            &nbsp; 3 years <br /> (in accordance with the Act on Consumer
            Protection in Electronic Commerce)
          </SectionParagraph>
        </IndentedBox>

        <SectionSubTitle variant="h6">
          Article 5 (Provision of Personal Information to Third Parties)
        </SectionSubTitle>
        <SectionParagraph>
          The Company does not provide members' personal information to external
          parties in principle. However, the following cases are exceptions:
        </SectionParagraph>
        <IndentedBox>
          <SectionParagraph>
            When the member has given prior consent
          </SectionParagraph>
          <SectionParagraph>
            When required by law or requested by investigative agencies in
            accordance with legal procedures and methods
          </SectionParagraph>
        </IndentedBox>

        <SectionSubTitle variant="h6">
          Article 6 (Procedures and Methods for Destroying Personal Information)
        </SectionSubTitle>
        <SectionParagraph>
          &nbsp; The Company promptly destroys personal information when the
          purpose of collection and use is achieved. The destruction procedures
          and methods are as follows:
        </SectionParagraph>
        <IndentedBox>
          <SectionParagraph>
            &nbsp;
            <strong>Destruction Procedures:</strong> Information entered by the
            member for sign-up, etc., is moved to a separate database after the
            purpose is achieved and stored for a certain period according to
            internal policies and other relevant laws before being destroyed.
          </SectionParagraph>
          <SectionParagraph>
            &nbsp;
            <strong>Destruction Methods:</strong> Information in electronic file
            format is deleted using technical methods that prevent the records
            from being reproduced. Personal information printed on paper is
            shredded or incinerated to be destroyed.
          </SectionParagraph>
        </IndentedBox>

        <SectionSubTitle variant="h6">
          Article 7 (Rights and Obligations of Members)
        </SectionSubTitle>
        <SectionParagraph>
          &nbsp; Members can view or modify their personal information at any
          time and can withdraw consent to the collection and use of personal
          information through membership withdrawal. Members are responsible for
          protecting their personal information, and the Company is not liable
          for issues arising from the member's negligence.
        </SectionParagraph>

        <SectionSubTitle variant="h6">
          Article 8 (Personal Information Protection Officer)
        </SectionSubTitle>
        <SectionParagraph>
          &nbsp; The Company has designated the following department and
          personal information protection officer to protect members' personal
          information and handle complaints related to personal information.
        </SectionParagraph>
        <IndentedBox>
          <SectionParagraph>
            <strong>Personal Information Protection Officer:</strong> CEO: KIM
            KWANG IL
          </SectionParagraph>
          <SectionParagraph>
            <strong>Email:</strong> support@essayfit.com
          </SectionParagraph>
        </IndentedBox>

        <SectionSubTitle variant="h6">
          Article 9 (Miscellaneous)
        </SectionSubTitle>
        <SectionParagraph>
          &nbsp; In case of changes to this Privacy Policy, the Company will
          notify the changes through announcements at least 7 days before the
          effective date. However, for significant changes affecting members'
          rights, the Company will notify at least 30 days in advance.
        </SectionParagraph>
        <SectionParagraph sx={{ textAlign: 'center', mt: 3 }}>
          Appendix Notice Date: June 5, 2024 Effective Date: July 29, 2024
        </SectionParagraph>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
