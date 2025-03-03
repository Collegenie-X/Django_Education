// src/components/Privacy/TemsServicePaidServiceComponent.tsx
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

const TemsServicePaidServiceComponent: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <SectionTitle variant="h4" sx={{ mb: 4 }}>
          Paid Service Terms of Use
        </SectionTitle>

        <SectionSubTitle variant="h6">
          Chapter 1: General Provisions
        </SectionSubTitle>

        <SectionSubTitle variant="h6">Article 1 (Purpose)</SectionSubTitle>
        <SectionParagraph>
          The purpose of these terms is to stipulate the rights and obligations,
          responsibilities, and other necessary matters between Collegenie AI
          (hereinafter referred to as the “Company”) and its members concerning
          the use of the StudyOLA Store (hereinafter referred to as the
          “Service”) provided by the Company.
        </SectionParagraph>

        <SectionSubTitle variant="h6">Article 2 (Definitions)</SectionSubTitle>
        <SectionParagraph>
          The definitions of terms used in these terms are as follows:
        </SectionParagraph>
        <IndentedBox>
          <SectionParagraph>
            1. <strong>"Service"</strong> refers to the content and related
            information and software provided by the Company to members through
            wired or wireless access devices.
          </SectionParagraph>
          <SectionParagraph>
            2. <strong>"Member"</strong> refers to a user who has agreed to the
            StudyOLA Store terms of use, these terms, and the provision of
            personal information, and has been granted the right to use the
            Service by the Company.
          </SectionParagraph>
          <SectionParagraph>
            3. <strong>"Content"</strong> refers to all digital materials
            (texts, images, etc.) produced and processed to be provided to
            members as part of the Service.
          </SectionParagraph>
          <SectionParagraph>
            4. <strong>"Paid Service"</strong> refers to the services mentioned
            in Item 1 that are provided for a fee by the Company.
          </SectionParagraph>
          <SectionParagraph>
            5. <strong>"Access Device"</strong> refers to devices such as mobile
            phones, PCs, tablets, etc., that allow the downloading or
            network-based use of content.
          </SectionParagraph>
          <SectionParagraph>
            6. <strong>"Credit"</strong> refers to the electronic payment means
            provided by the Company. Free credits provided may be subject to
            expiration according to the Company's policies. Detailed information
            about credits can be found in our usage policy and the StudyOLA
            Store Electronic Financial Transaction Terms of Use.
          </SectionParagraph>
        </IndentedBox>
        <SectionParagraph>
          Parts not specified in these terms shall follow the StudyOLA Store
          Terms of Use, service guides, relevant laws, and general commercial
          practices.
        </SectionParagraph>

        <SectionSubTitle variant="h6">
          Article 3 (Posting and Amendment of Terms)
        </SectionSubTitle>
        <IndentedBox>
          <SectionParagraph>
            1. The Company shall post the contents of these terms in a way that
            members can easily check, such as on the initial screen of the
            Service or through a pop-up screen. These terms become effective
            when a member agrees to them while using the paid services provided
            within the Service.
          </SectionParagraph>
          <SectionParagraph>
            2. The Company may amend these terms within the scope that does not
            violate relevant laws such as the "Content Industry Promotion Act",
            "Act on Consumer Protection in Electronic Commerce", "Regulation of
            Terms and Conditions Act", "Act on Promotion of Information and
            Communications Network Utilization and Information Protection", etc.
          </SectionParagraph>
          <SectionParagraph>
            3. When the Company amends these terms, it will specify the
            application date and reasons for the amendment and notify members by
            posting the current terms along with the amended terms at an
            appropriate location within the Service 15 days before the
            application date. However, if the amendment is unfavorable to
            members, it will be notified 30 days in advance.
          </SectionParagraph>
          <SectionParagraph>
            4. If the Company notifies or informs members of the amendment
            according to this article and the member does not explicitly express
            their refusal before the application date of the amended terms, the
            member is considered to have agreed to the amendment.
          </SectionParagraph>
          <SectionParagraph>
            5. If a member does not agree to the application of the amended
            terms, the Company cannot apply the contents of the amended terms to
            the member, and in this case, the member may terminate the service
            use contract according to these terms. However, if there are special
            circumstances where the existing terms can no longer be applied to a
            member who does not agree to the amended terms, the Company may
            terminate the service use contract.
          </SectionParagraph>
          <SectionParagraph>
            6. These terms shall apply from the date the member agrees to them
            until they withdraw. However, some provisions of these terms, such
            as Article 9, may still apply after withdrawal between the Company
            and the member.
          </SectionParagraph>
          <SectionParagraph>
            7. The provisions of the StudyOLA Store Paid Service Terms of Use
            take precedence over the related provisions of the StudyOLA Store
            Terms of Use. In the event of any conflict between the definitions,
            contents, etc., of the two terms, the related provisions of these
            terms shall apply. Matters not specified in these terms shall follow
            the StudyOLA Store Terms of Use, and matters not specified in the
            StudyOLA Store Terms of Use shall follow relevant laws such as the
            Content Industry Promotion Act, the Act on Consumer Protection in
            Electronic Commerce, and the Regulation of Terms and Conditions Act.
          </SectionParagraph>
        </IndentedBox>

        <SectionSubTitle variant="h6">
          Article 4 (Content of Paid Services)
        </SectionSubTitle>
        <IndentedBox>
          <SectionParagraph>
            1. The Company shall display the following information in an easily
            accessible manner on the initial screen or pop-up screen of the
            respective paid service:
          </SectionParagraph>
          <IndentedBox>
            <SectionParagraph>
              1. Name or title of the paid service
            </SectionParagraph>
            <SectionParagraph>
              2. Content, usage method, usage fee, and other conditions of the
              paid service
            </SectionParagraph>
          </IndentedBox>
          <SectionParagraph>
            2. The accessible devices for the paid services provided by the
            Company and the minimum technical specifications required for use
            follow the recommended specifications information.
          </SectionParagraph>
          <SectionParagraph>
            3. The Company clearly guides the conditions and procedures for the
            exchange, return, warranty, and refund of fees related to the
            provision of paid services. These conditions and procedures are
            specified on the initial screen, pop-up screen, and usage policy of
            the Service and include the following:
          </SectionParagraph>
          <IndentedBox>
            <SectionParagraph>
              1. Specific conditions and procedures for exchange, return, and
              warranty
            </SectionParagraph>
            <SectionParagraph>
              2. Conditions and procedures for fee refunds
            </SectionParagraph>
            <SectionParagraph>
              3. Company's processing period for exchange, return, warranty, and
              refund requests
            </SectionParagraph>
            <SectionParagraph>
              4. Payment method and period for refunds
            </SectionParagraph>
          </IndentedBox>
          <SectionParagraph>
            4. If the above conditions and procedures change, the Company will
            notify the changes through the initial screen, pop-up screen, and
            usage policy of the Service 30 days before the application date.
          </SectionParagraph>
        </IndentedBox>

        <SectionSubTitle variant="h6">
          Article 5 (Formation of Use Contract)
        </SectionSubTitle>
        <IndentedBox>
          <SectionParagraph>
            1. Members apply for the use of paid services through the following
            or similar procedures. The Company provides information related to
            these procedures to ensure that members accurately understand and
            transact without mistakes or errors before entering into a paid
            service use contract:
          </SectionParagraph>
          <IndentedBox>
            <SectionParagraph>
              1. Checking and selecting the content, usage method, usage fee,
              and other conditions of the paid service
            </SectionParagraph>
            <SectionParagraph>
              2. Selecting the payment method and entering payment information
            </SectionParagraph>
            <SectionParagraph>
              3. Confirming the application for the use of the paid service or
              agreeing to the Company's confirmation
            </SectionParagraph>
          </IndentedBox>
          <SectionParagraph>
            2. The formation time of the paid service use contract is the point
            in time when the application for membership completion or purchase
            completion is indicated in the application procedure.
          </SectionParagraph>
          <SectionParagraph>
            3. Members must comply with the contents specified in the [StudyOLA
            Store Payment Service Operation Policy] to use the paid services.
          </SectionParagraph>
        </IndentedBox>

        <SectionSubTitle variant="h6">
          Article 6 (Special Provisions for Use Contracts by Minors)
        </SectionSubTitle>
        <IndentedBox>
          <SectionParagraph>
            1. If a minor under the age of 19 wishes to use paid services, the
            Company will inform them that the contract may be canceled by the
            minor or their legal representative if consent from the legal
            representative, such as a parent, is not obtained or approved after
            the contract.
          </SectionParagraph>
          <SectionParagraph>
            2. If a member, despite being a minor, proceeds with the legal
            representative's consent or approval procedure using the ID or
            personal information of an adult third party, or deceives the
            Company into believing they are an adult by using the payment
            information of an adult third party without the third party’s
            consent, or if the legal representative allowed the minor to use the
            property within a specified range, the member or their legal
            representative cannot request the cancellation of the purchase from
            the Company, even if there was no consent from the legal
            representative at the time of purchase.
          </SectionParagraph>
        </IndentedBox>

        <SectionSubTitle variant="h6">
          Article 7 (Payment Method)
        </SectionSubTitle>
        <IndentedBox>
          <SectionParagraph>
            1. Members can purchase paid services using the following payment
            methods, and the Company does not charge any additional fees for the
            selected payment method. However, if there is a separate provider
            for the selected payment method, members must complete the
            procedures required by the payment method provider before using the
            method:
          </SectionParagraph>
          <IndentedBox>
            <SectionParagraph>
              1. Payment methods designated by the Company
            </SectionParagraph>
          </IndentedBox>
          <SectionParagraph>
            According to the Company's policies and the standards of the payment
            method providers mentioned above, the monthly cumulative payment
            amount or charging limit for each member may be restricted.
          </SectionParagraph>
        </IndentedBox>

        <SectionSubTitle variant="h6">
          Article 8 (Refund Policy)
        </SectionSubTitle>
        <IndentedBox>
          <SectionParagraph>
            1. For app market payments (in-app payments), the Company takes
            measures such as requesting the suspension or cancellation of
            payments to the respective app market in accordance with the "Act on
            Consumer Protection in Electronic Commerce". However, please refer
            to the policy of the respective app market regarding the measures
            taken by the app market in response to the Company's request.
          </SectionParagraph>
          <SectionParagraph>
            2. If the parties responsible for the performance of paid services
            are not the same, they shall be jointly responsible for fulfilling
            the obligations related to refunds due to withdrawal of
            subscription:
          </SectionParagraph>
          <IndentedBox>
            <SectionParagraph>1. The Company</SectionParagraph>
            <SectionParagraph>
              2. The party who received the payment from the member for the paid
              service
            </SectionParagraph>
            <SectionParagraph>
              3. The party who signed the service use contract with the member
            </SectionParagraph>
          </IndentedBox>
          <SectionParagraph>
            3. If a member improperly uses the app market payment (in-app
            payment) policy, such as by requesting a refund for non-refundable
            transactions, the Company may charge the member for the improperly
            refunded amount and deduct it from the credits held by the member.
            In such cases, the member loses the right to use the unused credits.
          </SectionParagraph>
          <SectionParagraph>
            4. Refunds are not possible after the purchase of paid services.
          </SectionParagraph>
          <SectionParagraph>
            5. Refunds are also not possible in the following cases:
          </SectionParagraph>
          <IndentedBox>
            <SectionParagraph>
              1. Violation of the Company's service terms of use
            </SectionParagraph>
            <SectionParagraph>
              2. Requests for refunds for damages caused by the member's fault
            </SectionParagraph>
          </IndentedBox>
          <SectionParagraph>
            6. This refund policy is considered part of the Company's service
            terms of use.
          </SectionParagraph>
          <SectionParagraph>
            7. All members agree to this refund policy to use the services.
          </SectionParagraph>
          <SectionParagraph>
            8. The Company may modify this refund policy without prior notice,
            and the modified policy becomes effective after being posted on the
            Company's website.
          </SectionParagraph>
          <SectionParagraph>
            This modified refund policy clearly stipulates that refunds are not
            possible after the purchase of paid services.
          </SectionParagraph>
        </IndentedBox>

        <SectionSubTitle variant="h6">
          Article 9 (Refund of Overpayment)
        </SectionSubTitle>
        <IndentedBox>
          <SectionParagraph>
            1. In principle, overpayments incurred during the service use
            process are refunded using the same payment method initially
            employed by the member. If the same method is not possible, the
            member will be immediately notified and refunded using an
            alternative method chosen by the member.
          </SectionParagraph>
          <SectionParagraph>
            2. If an overpayment due to the member’s fault occurs and the
            Company must refund the overpayment to the member, the fees incurred
            for the refund are borne by the member.
          </SectionParagraph>
        </IndentedBox>

        <SectionParagraph sx={{ textAlign: 'center', mt: 3 }}>
          Notice Date: May 23, 2024 | Effective Date: July 29, 2024
        </SectionParagraph>
      </Box>
    </Container>
  );
};

export default TemsServicePaidServiceComponent;
