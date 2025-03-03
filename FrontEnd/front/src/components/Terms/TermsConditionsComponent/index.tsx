// src/components/Privacy/TermsConditionsComponent.tsx
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

const TermsConditionsComponent: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <SectionTitle variant="h4" sx={{ mb: 4 }}>
          Terms of Service
        </SectionTitle>

        <SectionSubTitle variant="h6">
          Chapter 1: General Provisions
        </SectionSubTitle>

        <SectionSubTitle variant="h6">Article 1 (Purpose)</SectionSubTitle>
        <SectionParagraph>
          The purpose of these Terms of Service is to stipulate the rights and
          obligations, responsibilities, and other necessary matters between
          Collegenie AI (hereinafter referred to as the “Company”) and its
          members concerning the use of the StudyOLA Store (hereinafter referred
          to as the “Service”) provided by the Company.
        </SectionParagraph>

        <SectionSubTitle variant="h6">Article 2 (Definitions)</SectionSubTitle>
        <SectionParagraph>
          1. The definitions of terms used in these Terms of Service are as
          follows:
        </SectionParagraph>
        <IndentedBox>
          <SectionParagraph>
            <strong>1. "Service":</strong> Refers to the content and related
            information and software provided by the Company to members through
            wired or wireless access devices.
          </SectionParagraph>
          <SectionParagraph>
            <strong>2. "Member":</strong> Refers to a user who has agreed to
            these Terms of Service and the provision of personal information,
            and has been granted the right to use the Service by the Company.
          </SectionParagraph>
          <SectionParagraph>
            <strong>3. "Content":</strong> Refers to all digital materials
            (texts, images, etc.) produced and processed to be provided to
            members as part of the Service.
          </SectionParagraph>
          <SectionParagraph>
            <strong>4. "Paid Service":</strong> Refers to the services mentioned
            in Item 1 that are provided for a fee by the Company.
          </SectionParagraph>
          <SectionParagraph>
            <strong>5. "Access Device":</strong> Refers to devices such as
            mobile phones, PCs, tablets, etc., that allow the downloading or
            network-based use of content.
          </SectionParagraph>
          <SectionParagraph>
            <strong>6. "Credit":</strong> Refers to the electronic payment means
            provided by the Company. Free credits provided may be subject to
            expiration according to the Company's policies.
          </SectionParagraph>
        </IndentedBox>
        <SectionParagraph>
          2. The definitions of terms used in these Terms of Service follow the
          definitions in this article, related individual terms of service,
          service guides, relevant laws, and general commercial practices.
        </SectionParagraph>

        <SectionSubTitle variant="h6">
          Article 3 (Posting and Amendment of Terms of Service)
        </SectionSubTitle>
        <SectionParagraph>
          1. The Company shall post the contents of these Terms of Service in a
          way that members can easily check, such as on the initial screen of
          the Service or through a pop-up screen.
        </SectionParagraph>
        <SectionParagraph>
          2. These Terms of Service become effective when a member agrees to
          them while using the provided Service.
        </SectionParagraph>
        <SectionParagraph>
          3. The Company may amend these Terms of Service within the scope that
          does not violate related laws.
        </SectionParagraph>
        <SectionParagraph>
          4. When the Company amends these Terms of Service, it will specify the
          application date and reasons for the amendment, and notify members by
          posting the current Terms of Service along with the amended Terms of
          Service at an appropriate location within the Service 15 days before
          the application date.
        </SectionParagraph>
        <SectionParagraph>
          5. If the Company notifies or informs members of the amendment and the
          member does not explicitly express their refusal, the member is
          considered to have agreed to the amendment.
        </SectionParagraph>
        <SectionParagraph>
          6. If a member does not agree to the application of the amended Terms
          of Service, the Company cannot apply the contents of the amended Terms
          of Service to the member.
        </SectionParagraph>
        <SectionParagraph>
          7. These Terms of Service shall apply from the date the member agrees
          to them until they withdraw.
        </SectionParagraph>

        <SectionSubTitle variant="h6">
          Article 4 (Notice to Members)
        </SectionSubTitle>
        <SectionParagraph>
          1. When the Company needs to notify a member, it can do so through
          pop-up screens or notices within the Service.
        </SectionParagraph>
        <SectionParagraph>
          2. The Company may substitute individual notifications to all members
          by posting a notice on the Service or a pop-up screen for at least 7
          days.
        </SectionParagraph>

        <SectionSubTitle variant="h6">
          Chapter 2: Contract Formation and Service Use
        </SectionSubTitle>

        <SectionSubTitle variant="h6">
          Article 5 (Formation and Application of Use Contract)
        </SectionSubTitle>
        <SectionParagraph>
          1. Users who wish to become members must enter into a service use
          contract with the Company.
        </SectionParagraph>
        <SectionParagraph>
          2. The Company may impose age restrictions or membership grade
          restrictions on the use of the Service in accordance with relevant
          laws.
        </SectionParagraph>
        <SectionParagraph>
          3. The Company approves the service use application of a user who
          accurately fills in the required information on the member
          registration screen.
        </SectionParagraph>
        <SectionParagraph>
          4. Users may use the paid services provided by the Company by agreeing
          to the individual paid service terms of use.
        </SectionParagraph>
        <SectionParagraph>
          5. If a user under the age of 19 uses paid services, they must obtain
          prior consent from their legal representative.
        </SectionParagraph>

        <SectionSubTitle variant="h6">
          Article 6 (Provision and Change of Member Information)
        </SectionSubTitle>
        <SectionParagraph>
          1. When providing information about a member to the Company, the
          member must provide truthful information.
        </SectionParagraph>
        <SectionParagraph>
          2. If the information provided during membership registration changes,
          the member must immediately update it online.
        </SectionParagraph>
        <SectionParagraph>
          3. The Company is not responsible for any disadvantages suffered by
          the member or third parties due to the member's failure to update the
          information.
        </SectionParagraph>

        <SectionSubTitle variant="h6">
          Article 7 (Display of Identity Information and Conditions for Using
          Content)
        </SectionSubTitle>
        <SectionParagraph>
          1. The Company shall sequentially display the contents of these Terms
          of Service, company name, representative’s name, business registration
          number, etc., in a way that members can easily see on the service
          screen.
        </SectionParagraph>
        <SectionParagraph>
          2. Conditions for using paid services by members can be checked
          through individual paid service terms of use and each content purchase
          screen.
        </SectionParagraph>
        <SectionParagraph>
          3. In principle, the usage rights purchased by members can only be
          used for the corresponding content.
        </SectionParagraph>
        <SectionParagraph>
          4. Members can only use the usage rights on their own account as
          notified by the Company, and cannot transfer, lend, or sell them to
          third parties.
        </SectionParagraph>
        <SectionParagraph>
          5. If counseling is needed for the use of purchased content, members
          can contact support@essayfit.com.
        </SectionParagraph>
        <SectionParagraph>
          6. Other matters such as withdrawal of subscription, termination of
          contract, compensation for damage, and restrictions on content use are
          subject to other provisions of these Terms of Service.
        </SectionParagraph>

        <SectionSubTitle variant="h6">
          Article 8 (Service Hours)
        </SectionSubTitle>
        <SectionParagraph>
          1. The Company provides services during the hours specified by its
          business policy.
        </SectionParagraph>
        <SectionParagraph>
          2. Notwithstanding Paragraph 1, the Company may not provide the
          Service in the following cases:
        </SectionParagraph>
        <IndentedBox>
          <SectionParagraph>
            <strong>1. When there are reasonable operational reasons</strong>{' '}
            such as maintenance, replacement, malfunction, or regular
            inspection.
          </SectionParagraph>
          <SectionParagraph>
            <strong>
              2. When it is necessary to respond to electronic hacking incidents
            </strong>{' '}
            or unforeseen instability in content services.
          </SectionParagraph>
          <SectionParagraph>
            <strong>3. When it is impossible to provide normal services</strong>{' '}
            due to force majeure such as natural disasters or emergencies.
          </SectionParagraph>
          <SectionParagraph>
            <strong>
              4. When related laws or government policies prohibit
            </strong>{' '}
            the provision of content services.
          </SectionParagraph>
          <SectionParagraph>
            <strong>5. When there are unavoidable reasons</strong> beyond the
            Company’s control.
          </SectionParagraph>
        </IndentedBox>
        <SectionParagraph>
          3. In the event of a service interruption due to significant reasons,
          the Company will notify the members.
        </SectionParagraph>
        <SectionParagraph>
          4. The Company may change the Service from time to time as necessary
          for operational needs.
        </SectionParagraph>
        <SectionParagraph>
          5. The Company may discontinue some or all of the services for
          technical or operational reasons.
        </SectionParagraph>
        <SectionParagraph>
          6. If a member obtains a refund through improper use of the app market
          payment policy, the Company may charge the member for the improperly
          refunded amount.
        </SectionParagraph>

        <SectionSubTitle variant="h6">
          Chapter 3: Obligations of Contracting Parties
        </SectionSubTitle>

        <SectionSubTitle variant="h6">
          Article 9 (Obligations of the Company)
        </SectionSubTitle>
        <SectionParagraph>
          1. The Company shall comply with relevant laws and faithfully exercise
          the rights and perform the obligations stipulated in these Terms of
          Service.
        </SectionParagraph>
        <SectionParagraph>
          2. The Company shall not provide members’ personal information to
          third parties without the member’s consent, except in cases required
          by law.
        </SectionParagraph>
        <SectionParagraph>
          3. The Company shall implement necessary security systems to protect
          members’ personal information.
        </SectionParagraph>
        <SectionParagraph>
          4. If the Company becomes aware of ongoing harm due to the illegal
          activities of a specific member, it shall notify the occurrence of
          such harm.
        </SectionParagraph>

        <SectionSubTitle variant="h6">
          Article 10 (Obligations of Members)
        </SectionSubTitle>
        <SectionParagraph>
          1. Members shall comply with the matters stipulated in these Terms of
          Service.
        </SectionParagraph>
        <SectionParagraph>
          2. Members shall not engage in the following activities:
        </SectionParagraph>
        <IndentedBox>
          <SectionParagraph>
            <strong>1. Registering false information</strong> or using another
            member’s ID and password.
          </SectionParagraph>
          <SectionParagraph>
            <strong>2. Collecting, storing, or disclosing</strong> other
            members' personal information.
          </SectionParagraph>
          <SectionParagraph>
            <strong>3. Distributing false information</strong> on the service
            bulletin board to cause harm to others.
          </SectionParagraph>
          <SectionParagraph>
            <strong>4. Reproducing or distributing content</strong> provided by
            the Company without prior approval.
          </SectionParagraph>
          <SectionParagraph>
            <strong>
              5. Using content for purposes other than personal appreciation
            </strong>{' '}
            within the Service.
          </SectionParagraph>
          <SectionParagraph>
            <strong>6. Damaging the reputation or insulting others</strong>{' '}
            during the service use process.
          </SectionParagraph>
          <SectionParagraph>
            <strong>7. Posting obscene materials</strong> or distributing
            information that violates public order and good morals.
          </SectionParagraph>
          <SectionParagraph>
            <strong>8. Pretending to be someone else</strong> or falsely stating
            relationships with others during the service use process.
          </SectionParagraph>
          <SectionParagraph>
            <strong>
              9. Impersonating or pretending to be a Company employee
            </strong>{' '}
            or using another person’s name.
          </SectionParagraph>
          <SectionParagraph>
            <strong>10. Changing service-related programs</strong> or websites
            without special rights granted by the Company.
          </SectionParagraph>
          <SectionParagraph>
            <strong>11. Registering or distributing computer viruses</strong> or
            virus-infected materials.
          </SectionParagraph>
          <SectionParagraph>
            <strong>
              12. Sharing one’s service account with third parties
            </strong>{' '}
            or creating multiple accounts improperly.
          </SectionParagraph>
          <SectionParagraph>
            <strong>13. Creating multiple accounts</strong> to receive free
            credits or other rewards improperly.
          </SectionParagraph>
          <SectionParagraph>
            <strong>14. Infringing on the intellectual property rights</strong>{' '}
            of the Company or third parties.
          </SectionParagraph>
          <SectionParagraph>
            <strong>15. Transmitting advertising information</strong> without
            the Company’s prior consent.
          </SectionParagraph>
          <SectionParagraph>
            <strong>16. Interfering with the Company’s business</strong> or
            damaging the Company’s reputation.
          </SectionParagraph>
          <SectionParagraph>
            <strong>17. Engaging in illegal or inappropriate activities</strong>{' '}
            violating public order and good morals.
          </SectionParagraph>
          <SectionParagraph>
            <strong>
              18. Engaging in any other activities equivalent to the above.
            </strong>
          </SectionParagraph>
        </IndentedBox>
        <SectionParagraph>
          3. If a member’s registration information changes, they must update it
          immediately.
        </SectionParagraph>

        <SectionSubTitle variant="h6">
          Chapter 4: Withdrawal of Subscription, Termination of Contract, and
          Usage Restrictions
        </SectionSubTitle>

        <SectionSubTitle variant="h6">
          Article 13 (Withdrawal of Subscription, Termination of Contract)
        </SectionSubTitle>
        <SectionParagraph>
          1. In principle, purchased or subscribed paid services or products
          cannot be changed.
        </SectionParagraph>
        <SectionParagraph>
          2. Purchased or subscribed paid services or products cannot be
          refunded or terminated.
        </SectionParagraph>
        <SectionParagraph>
          3. If a member violates relevant laws or these Terms of Service, the
          Company may terminate the service use contract without refund.
        </SectionParagraph>

        <SectionSubTitle variant="h6">
          Article 14 (Usage Restrictions)
        </SectionSubTitle>
        <SectionParagraph>
          1. If a member violates the obligations stipulated in these Terms of
          Service, the Company may restrict the member's use of the Service
          after prior notification.
        </SectionParagraph>
        <SectionParagraph>
          2. If a member’s violation is severe, the Company may take usage
          restriction measures without prior notice.
        </SectionParagraph>

        <SectionSubTitle variant="h6">Chapter 5: Miscellaneous</SectionSubTitle>

        <SectionSubTitle variant="h6">
          Article 16 (Company Disclaimer)
        </SectionSubTitle>
        <SectionParagraph>
          1. The Company is not responsible for any inability to provide the
          Service due to force majeure events.
        </SectionParagraph>
        <SectionParagraph>
          2. The Company is not responsible for service disruptions due to
          members' faults.
        </SectionParagraph>
        <SectionParagraph>
          3. The Company is not responsible for issues related to information
          and communication network usage environments or various wired or
          wireless devices of members.
        </SectionParagraph>
        <SectionParagraph>
          4. The Company is not responsible for the reliability or accuracy of
          information, data, etc., posted by members.
        </SectionParagraph>
        <SectionParagraph>
          5. The Company is not responsible for any disadvantages caused by
          changes in personal information.
        </SectionParagraph>
        <SectionParagraph>
          6. The Company is not responsible for any transactions or
          relationships between members or between members and third parties
          established through the Service.
        </SectionParagraph>

        <SectionSubTitle variant="h6">
          Article 17 (Other Applicable Provisions)
        </SectionSubTitle>
        <SectionParagraph>
          The Company may establish individual service terms of use and
          operating policies in addition to these Terms of Service.
        </SectionParagraph>

        <SectionSubTitle variant="h6">
          Article 18 (Application for Dispute Adjustment)
        </SectionSubTitle>
        <SectionParagraph>
          1. The Company receives feedback and handles complaints and damages
          through support@essayfit.com.
        </SectionParagraph>
        <SectionParagraph>
          2. In the event of a dispute, the Company shall take appropriate
          action within 60 business days.
        </SectionParagraph>
        <SectionParagraph>
          3. If no agreement is reached, the member may apply for dispute
          adjustment to the Content Dispute Resolution Committee.
        </SectionParagraph>

        <SectionSubTitle variant="h6">
          Article 19 (Governing Law and Jurisdiction)
        </SectionSubTitle>
        <SectionParagraph>
          1. The governing law for disputes between the Company and the member
          shall be the laws of the Republic of Korea.
        </SectionParagraph>
        <SectionParagraph>
          2. The court of jurisdiction for disputes between the Company and the
          member shall follow the jurisdictional regulations under the "Civil
          Procedure Act".
        </SectionParagraph>

        <SectionParagraph sx={{ textAlign: 'center', mt: 3 }}>
          Notice Date: May 23, 2024 Effective Date: July 29, 2024
        </SectionParagraph>
      </Box>
    </Container>
  );
};

export default TermsConditionsComponent;
