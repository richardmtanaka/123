import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Welcome to PRD Builder"
      size="medium"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Button variant="brand" onClick={onClose}>Get Started</Button>
        </div>
      }
    >
      <div style={{ lineHeight: 1.7 }}>
        <p className="slds-text-body_regular slds-m-bottom_medium">
          <strong>PRD Builder</strong> helps Salesforce Personalization PMs quickly draft
          a complete PRD prompt that you can paste into Gemini (or any AI) to generate
          a full PRD document.
        </p>

        <h3 className="slds-text-heading_small slds-m-bottom_x-small">How it works</h3>
        <ol className="slds-list_ordered slds-m-left_medium slds-m-bottom_medium" style={{ lineHeight: 2 }}>
          <li>Walk through <strong>10 guided steps</strong> — feature basics, people, personas, problem statement, business goals, jobs to be done, success metrics, competitive context, references, and notes.</li>
          <li>Review everything on the <strong>Review &amp; Export</strong> page.</li>
          <li>Click <strong>"Copy &amp; Open in Gemini"</strong> to copy your prompt and open Gemini in one click. Paste it in and get a full PRD draft.</li>
        </ol>

        <h3 className="slds-text-heading_small slds-m-bottom_x-small">Tips</h3>
        <ul className="slds-list_dotted slds-m-left_medium" style={{ lineHeight: 2 }}>
          <li>Drop <strong>Google Docs, Sheets, and Slides links</strong> into steps 8–10 — Gemini can open and read them when generating your PRD.</li>
          <li>Click any <strong>section header</strong> on the Review page to jump back and edit.</li>
          <li>Use the <strong>refresh icon</strong> in the header to start a new blank PRD.</li>
          <li>Hover over the <strong>info icons</strong> next to fields for guidance on what to enter.</li>
        </ul>
      </div>
    </Modal>
  );
}
