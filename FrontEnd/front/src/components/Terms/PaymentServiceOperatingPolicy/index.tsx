// src/components/Privacy/ServiceOperationalPolicyComponent.tsx
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

const PaymentServiceOperatingPolicy: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <SectionTitle variant="h4" sx={{ mb: 4 }}>
          Payment Service Operating Policy
        </SectionTitle>

        <SectionParagraph>
          This operating policy applies to the "payment service" (including paid
          services within StudyOLA Store; hereinafter referred to as the same)
          provided by Collegenie AI (hereinafter referred to as the "Company").
          It is a comprehensive payment-related operating policy established to
          consistently address potential issues that may arise during the use of
          the payment service.
        </SectionParagraph>
        <SectionParagraph>
          This operating policy stipulates the detailed matters that members
          must adhere to for creating a sound commercial environment and
          ensuring safe use of the payment service. Violation of this policy or
          suspicion of illegal or improper activities may result in restrictions
          on the use of the payment service.
        </SectionParagraph>
        <SectionParagraph>
          The Company may change the detailed policies to provide a reasonable
          payment service.
        </SectionParagraph>

        <SectionSubTitle variant="h6">Members' Rights</SectionSubTitle>
        <IndentedBox>
          <SectionParagraph>
            1. Members can make various inquiries and requests related to the
            payment service through online inquiries at support@essayfit.com
            (24-hour reception). The Company does not intervene or take action
            in disputes arising between members or due to members' own mistakes
            during the use of the payment service. However, if a member is
            harmed due to another member’s violation of this operating policy
            during the use of the service, they can report it to the Company and
            request enforcement of the operating policy. The Company will review
            the report and take appropriate disciplinary action in accordance
            with the operating policy.
          </SectionParagraph>
        </IndentedBox>

        <SectionSubTitle variant="h6">Members' Obligations</SectionSubTitle>
        <IndentedBox>
          <SectionParagraph>
            1. Members must not engage in prohibited activities stipulated in
            this operating policy within the payment service provided by the
            Company, and must not engage in activities that violate relevant
            laws or interfere with the normal use of the payment service system
            and other members' use of the payment service.
          </SectionParagraph>
        </IndentedBox>

        <SectionSubTitle variant="h6">
          Prohibited Activities by Members
        </SectionSubTitle>
        <IndentedBox>
          <SectionParagraph>
            1. Registering false information in whole or in part when signing
            up.
          </SectionParagraph>
          <SectionParagraph>
            2. Using paid services provided by the Company in abnormal ways or
            accessing the system in unauthorized ways.
          </SectionParagraph>
          <SectionParagraph>
            3. Using paid services provided by the Company using another
            person's name, card information, or account information.
          </SectionParagraph>
          <SectionParagraph>
            4. Deceiving others to make payments on their behalf (e.g., phishing
            by impersonating acquaintances or institutions).
          </SectionParagraph>
          <SectionParagraph>
            5. Selling or transferring the member's access media.
          </SectionParagraph>
          <SectionParagraph>
            6. Renting, selling, or transferring the StudyOLA Store account to
            others.
          </SectionParagraph>
          <SectionParagraph>
            7. Making payments on behalf of others for compensation.
          </SectionParagraph>
          <SectionParagraph>
            8. Acquiring or using StudyOLA Store credits in unauthorized ways.
          </SectionParagraph>
          <SectionParagraph>
            9. Unauthorized alteration of information posted by the Company or
            transmitting or posting information (e.g., computer programs) other
            than the information determined by the Company.
          </SectionParagraph>
          <SectionParagraph>
            10. Damaging the reputation of the Company or third parties or
            interfering with their business.
          </SectionParagraph>
          <SectionParagraph>
            11. Repeated purchases or refunds without genuine intent to
            purchase.
          </SectionParagraph>
          <SectionParagraph>
            12. Reselling the Company's goods or services to third parties
            without the intention to use them, only for the purpose of raising
            funds.
          </SectionParagraph>
          <SectionParagraph>
            13. Purchasing exchange vouchers for illegal discounts and selling
            them to third parties.
          </SectionParagraph>
          <SectionParagraph>
            14. Using StudyOLA Store credits that were not properly charged for
            purchasing online digital content, or refusing to respond to the
            Company's billing for usage fees.
          </SectionParagraph>
          <SectionParagraph>
            15. Using online digital content that was not recovered after
            payment cancellation or refund by PG companies or platform providers
            (e.g., Google, Apple) and not reporting it to the Company.
          </SectionParagraph>
          <SectionParagraph>
            16. Not paying usage fees in the manner designated by the payment
            service provider or long-term delinquency of usage fees.
          </SectionParagraph>
          <SectionParagraph>
            17. Interfering with other members' use of prepaid electronic
            payment methods or hindering the provision of prepaid electronic
            payment methods by the Company.
          </SectionParagraph>
        </IndentedBox>

        <SectionSubTitle variant="h6">
          Restrictions on Members' Use of Payment Services
        </SectionSubTitle>
        <SectionParagraph>
          If a member's activities violate relevant laws, related terms, or this
          operating policy, the Company may restrict the use of the payment
          service to protect other users from harm. Even if not specifically
          mentioned in this operating policy, if a member's actions negatively
          impact the sound payment service environment or inconvenience other
          users, the payment service may be restricted.
        </SectionParagraph>
        <SectionParagraph>
          Usage restrictions are generally applied step-by-step from temporary
          to permanent restrictions based on the accumulation of violations.
          However, for clear illegal activities prohibited by law, infringement
          of others' rights requiring urgent risk or damage prevention, or
          activities suspected of being illegal or improper, the payment service
          use may be immediately and permanently restricted regardless of the
          accumulation of violations.
        </SectionParagraph>
        <IndentedBox>
          <SectionParagraph>
            - If fraudulent activities are detected, the payment service for the
            relevant account will be restricted without notice.
          </SectionParagraph>
          <SectionParagraph>
            - If illegal activities such as theft, phishing, or fraud occur or
            are reasonably suspected, the payment service may be restricted
            without prior warning.
          </SectionParagraph>
          <SectionParagraph>
            - Restrictions on the payment service may impose limitations on
            payment, charging, and purchasing online digital content.
          </SectionParagraph>
        </IndentedBox>
      </Box>
    </Container>
  );
};

export default PaymentServiceOperatingPolicy;
