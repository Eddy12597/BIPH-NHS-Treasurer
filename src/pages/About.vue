<template>
  <div class="about-page">
    <Header></Header>

    <main class="about">
      <!-- Hero -->
      <section class="hero">
        <p class="eyebrow">BIPH National Honor Society</p>
        <h1>About the Treasury</h1>
        <p class="lede">
          The BIPH NHS Treasury is the centralized financial management platform for the BIPH
          chapter of the National Honor Society. Established in 2020, the chapter relies on the
          Treasury to bring its financial workflow into a single website and database—replacing
          scattered proposal links and opaque reimbursement processes with a transparent,
          accountable system built for members.
        </p>
      </section>

      <!-- Purpose -->
      <section class="section">
        <h2>Purpose</h2>
        <p>
          The Treasury exists to make chapter finances easier to navigate and harder to lose track
          of. It was created to:
        </p>
        <ul class="list">
          <li>
            Consolidate budget proposals, reimbursement requests, and transaction records into one
            accessible platform.
          </li>
          <li>
            Expose full transactional logs—including timestamps, notes, amounts, and the current
            balance—to chapter members.
          </li>
          <li>
            Replace fragmented Microsoft Forms links with a single, flexible proposal workflow.
          </li>
          <li>
            Remove the "black box" from reimbursements by tying every request to a proposal ID and
            a permanent record.
          </li>
          <li>
            Give cabinet members and teacher advisors direct access to the underlying database for
            oversight.
          </li>
        </ul>
      </section>

      <!-- Alignment -->
      <section class="section">
        <h2>Built on the Four Pillars</h2>
        <p>The Treasury is designed to reflect the values that define the National Honor Society.</p>
        <div class="grid grid-4">
          <div class="card">
            <h3>Scholarship</h3>
            <p>Encourages organized, responsible financial planning for chapter events.</p>
          </div>
          <div class="card">
            <h3>Service</h3>
            <p>Streamlines funding for service projects and member-led initiatives.</p>
          </div>
          <div class="card">
            <h3>Leadership</h3>
            <p>Reflects a student-led effort to strengthen chapter operations.</p>
          </div>
          <div class="card">
            <h3>Character</h3>
            <p>Promotes honesty and accountability through publicly visible transaction logs.</p>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="section">
        <h2>Key Features</h2>
        <div class="grid grid-3">
          <div class="card">
            <h3>Submit Proposal</h3>
            <p>
              A flexible replacement for the chapter's previous Microsoft Forms workflow. Members
              submit funding proposals for events and initiatives. Each proposal is intended to
              carry a unique proposal ID, which members use to request reimbursement and to
              reference the proposal with NHS officers.
            </p>
          </div>
          <div class="card">
            <h3>Request Reimbursement</h3>
            <p>
              Members enter their proposal ID along with the item name and supporting notes, then
              upload a receipt or screenshot. Every request becomes a traceable record tied to an
              approved proposal.
            </p>
          </div>
          <div class="card">
            <h3>Logs</h3>
            <p>
              Full financial transactions are displayed with exact timestamps, notes, amounts, and
              the current chapter balance. Logs are searchable and exportable to CSV.
            </p>
          </div>
        </div>

        <div class="note">
          <h3>Planned Enhancements</h3>
          <ul class="list tight">
            <li>Displaying the proposal ID immediately after submission.</li>
            <li>
              Automated email confirmations containing the proposal ID, pending backend support.
            </li>
            <li>
              Uploading official bank statements and marking verified transactions, with statements
              available for members to view and download.
            </li>
            <li>Syncing uploaded reimbursement receipts directly into the database.</li>
          </ul>
        </div>
      </section>

      <!-- Origin -->
      <section class="section">
        <h2>Origin and Development</h2>
        <p>
          The BIPH NHS Treasury was created by Eddy Zhang, Treasurer for the 2026–2027 term, in
          fulfillment of a campaign promise to enhance transparency and ease of use for chapter
          members. The core logs and proposal prototype was completed in June 2026. The Submit
          Proposal and Request Reimbursement pages were completed in September 2026 and presented to
          the chapter's teacher advisor. The system is currently pending official chapter launch.
        </p>
        <p>
          The project is affiliated with the BIPH NHS chapter but was independently developed by
          the Treasurer. It is not a representation of the entire chapter, and all chapter branding
          and logos remain under the control of the chapter rather than the Treasury department.
        </p>
      </section>

      <!-- Governance -->
      <section class="section">
        <h2>Governance</h2>
        <p>
          Proposal and reimbursement rules follow the chapter's existing financial guidelines and
          should be familiar to members. The Cabinet and Teacher Advisors review and approve all
          requests. Financial data for the chapter treasury is made visible to members in the
          interest of transparency. The platform currently operates without individual logins or
          permission levels; it is intended for chapter members, while cabinet members and teacher
          advisors maintain access to the underlying database for oversight.
        </p>
      </section>

      <!-- Leadership -->
      <section class="section">
        <h2>Chapter Leadership, 2026–2027</h2>
        <div class="officers">
          <div class="officer">
            <span class="role">President</span>
            <span class="name">David Cheng</span>
          </div>
          <div class="officer">
            <span class="role">Vice President</span>
            <span class="name">Cathy Liu</span>
          </div>
          <div class="officer">
            <span class="role">Secretary</span>
            <span class="name">Rachelle Zhang</span>
          </div>
          <div class="officer">
            <span class="role">Treasurer</span>
            <span class="name">Eddy Zhang</span>
          </div>
          <div class="officer">
            <span class="role">Historian</span>
            <span class="name">Selina Zhang</span>
          </div>
          <div class="officer">
            <span class="role">Advertiser</span>
            <span class="name">Alan Wen</span>
          </div>
        </div>

        <div class="advisors">
          <span class="advisors-label">Teacher Advisors</span>
          <span class="advisor">Mr. Evan Wise</span>
          <span class="advisor">Mr. Christian Lygo</span>
        </div>
      </section>

      <!-- Contact -->
      <section class="section">
        <h2>Contact and Support</h2>
        <div class="contact">
          <p class="contact-title">Technical issues and financial inquiries</p>
          <p class="contact-name">Eddy Zhang, Treasurer</p>
          <p class="contact-email">
            <a href="mailto:eddy12597@163.com">eddy12597@163.com</a>   |   <a href="mailto:hamchiu.zhang14488-biph@basischina.com">hamchiu.zhang14488-biph@basischina.com</a>
          </p>
          <p class="contact-note">
            For broader questions or other chapter matters, members are welcome to contact the
            chapter cabinet or a teacher advisor.
          </p>
        </div>
      </section>
    </main>

    <Footer></Footer>
  </div>
</template>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #ffffff;
}

.about {
  flex: 1;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 3.5rem 1.75rem 5.5rem;
}

/* ---------- Hero ---------- */
.hero {
  padding-bottom: 2.75rem;
  border-bottom: 1px solid #e9eef6;
}

.eyebrow {
  margin: 0 0 0.9rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--blue1);
  opacity: 0.75;
}

.hero h1 {
  margin: 0 0 1.15rem;
  font-size: clamp(2rem, 4.2vw, 2.75rem);
  line-height: 1.12;
  letter-spacing: -0.022em;
  color: var(--blue1);
}

.lede {
  max-width: 70ch;
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.8;
  color: #3f4a5a;
}

/* ---------- Sections ---------- */
.section {
  margin-top: 3.5rem;
}

.section > h2 {
  margin: 0 0 1.15rem;
  font-size: 1.4rem;
  letter-spacing: -0.012em;
  color: var(--blue1);
}

.section > h2::after {
  content: "";
  display: block;
  width: 42px;
  height: 3px;
  margin-top: 0.7rem;
  border-radius: 2px;
  background: var(--blue1);
  opacity: 0.32;
}

.section p {
  max-width: 76ch;
  margin: 0 0 1rem;
  line-height: 1.8;
  color: #3f4a5a;
}

.section p:last-child {
  margin-bottom: 0;
}

/* ---------- Lists ---------- */
.list {
  display: grid;
  gap: 0.75rem;
  max-width: 78ch;
  margin: 1.35rem 0 0;
  padding: 0;
  list-style: none;
}

.list li {
  position: relative;
  padding-left: 1.6rem;
  line-height: 1.75;
  color: #3f4a5a;
}

.list li::before {
  content: "";
  position: absolute;
  left: 0.3rem;
  top: 0.65rem;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--blue1);
  opacity: 0.8;
}

.list.tight {
  gap: 0.55rem;
  margin-top: 0.9rem;
}

.list.tight li {
  font-size: 0.93rem;
  line-height: 1.65;
  color: #566070;
}

/* ---------- Cards ---------- */
.grid {
  display: grid;
  gap: 1rem;
  margin-top: 1.6rem;
}

.grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.grid-4 {
  grid-template-columns: repeat(auto-fit, minmax(195px, 1fr));
}

.card {
  padding: 1.4rem 1.45rem;
  border: 1px solid #e6ecf5;
  border-radius: 12px;
  background: #ffffff;
  /* transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease; */
}

/* .card:hover {
  border-color: var(--blue1);
  box-shadow: 0 8px 22px rgba(15, 45, 90, 0.07);
  transform: translateY(-2px);
} */

.card h3 {
  margin: 0 0 0.55rem;
  font-size: 1.02rem;
  color: var(--blue1);
}

.card p {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.68;
  color: #566070;
}

/* ---------- Note block ---------- */
.note {
  margin-top: 1.6rem;
  padding: 1.4rem 1.6rem;
  border: 1px solid #e6ecf5;
  border-radius: 12px;
  background: #f8fafd;
}

.note h3 {
  margin: 0;
  font-size: 0.98rem;
  color: var(--blue1);
}

/* ---------- Officers ---------- */
.officers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 0.85rem;
  margin-top: 1.6rem;
}

.officer {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem 1.15rem;
  border: 1px solid #e6ecf5;
  border-left: 3px solid var(--blue1);
  border-radius: 10px;
  background: #ffffff;
}

.officer .role {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: var(--blue1);
  opacity: 0.8;
}

.officer .name {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
}

/* ---------- Advisors ---------- */
.advisors {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.5rem;
}

.advisors-label {
  margin-right: 0.3rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: var(--blue1);
  opacity: 0.8;
}

.advisor {
  padding: 0.42rem 0.85rem;
  border: 1px solid #e6ecf5;
  border-radius: 999px;
  background: #f8fafd;
  font-size: 0.88rem;
  font-weight: 500;
  color: #3f4a5a;
}

/* ---------- Contact ---------- */
.contact {
  margin-top: 1.6rem;
  padding: 1.6rem 1.75rem;
  border: 1px solid #e6ecf5;
  border-left: 4px solid var(--blue1);
  border-radius: 12px;
  background: #f8fafd;
}

.contact-title {
  margin: 0 0 0.75rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--blue1);
  opacity: 0.8;
}

.contact-name {
  margin: 0 0 0.25rem;
  font-size: 1.02rem;
  font-weight: 600;
  color: #1f2937;
}

.contact-email {
  margin: 0 0 0.9rem;
}

.contact-email a {
  font-size: 0.98rem;
  font-weight: 500;
  color: var(--blue1);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  /* transition: border-color 0.18s ease; */
}

.contact-email a:hover {
  border-bottom-color: var(--blue1);
}

.contact-note {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.7;
  color: #566070;
}

/* ---------- Responsive ---------- */
@media (max-width: 640px) {
  .about {
    padding: 2.5rem 1.15rem 4rem;
  }

  .section {
    margin-top: 2.75rem;
  }

  .contact {
    padding: 1.35rem 1.25rem;
  }
}
</style>

<script setup lang="ts">
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>