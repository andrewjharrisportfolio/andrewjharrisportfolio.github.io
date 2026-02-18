/**
 * site-data.js
 * ============
 * All editable site content lives here.
 * Update any section below without touching the HTML files.
 */

const SITE_DATA = {

  // ─────────────────────────────────────────────
  // HERO — index.html top section
  // ─────────────────────────────────────────────
  hero: {
    name: "Andrew Harris",
    title: "Security Operations Analyst & Detection Engineer",
    // Displayed inside the terminal-style tagline block
    tagline: "Detecting threats. Engineering detections. Closing the gap between noise and signal."
  },

  // ─────────────────────────────────────────────
  // ABOUT — index.html "cat about.txt" section
  // ─────────────────────────────────────────────
  about: `I'm a Security Operations Analyst and Detection Engineer with hands-on experience triaging 150+ security incidents per month across enterprise SIEM environments. I specialize in building high-fidelity detection rules, reducing false-positive noise, and translating threat intelligence into actionable alerts. My work bridges the gap between raw log data and meaningful, response-ready detections — helping security teams move faster and smarter. With 6 certifications earned in under 13 months and a 98.5% QA rating, I bring both the technical depth and the discipline that modern SOC environments demand.`,

  // ─────────────────────────────────────────────
  // STATS — index.html stats bar
  // color options: 'cyan' | 'green' | 'purple'
  // ─────────────────────────────────────────────
  stats: [
    { value: "150+",  label: "Monthly Security Incidents Handled", color: "cyan"   },
    { value: "98.5%", label: "QA Rating",                          color: "green"  },
    { value: "6",     label: "Certifications Earned in 13 Months", color: "purple" }
  ],

  // ─────────────────────────────────────────────
  // CERTIFICATIONS — certifications.html
  // Replace credlyUrl with your actual Credly badge URL when ready
  // ─────────────────────────────────────────────
  certifications: [
    {
      abbr:      "GCIH",
      name:      "GIAC Certified Incident Handler",
      credlyUrl: "https://www.credly.com/badges/dc34fc75-1556-4f63-8e67-1248d0678880/public_url",
      // ↓ Paste your Credly badge image URL here (right-click badge on Credly → Copy Image Address)
      imageUrl:  ""
    },
    {
      abbr:      "GSEC",
      name:      "GIAC Security Essentials",
      credlyUrl: "https://www.credly.com/badges/42812ab8-5637-4544-90b3-01ce70d81969/public_url",
      imageUrl:  ""
    },
    {
      abbr:      "GFACT",
      name:      "GIAC Foundational Cybersecurity Technologies",
      credlyUrl: "https://www.credly.com/badges/74fbf669-fe87-4733-ac17-076db3929e92/linked_in_profile",
      imageUrl:  ""
    },
    {
      abbr:      "SEC+",
      name:      "CompTIA Security+",
      credlyUrl: "https://www.credly.com/badges/cef8f254-88b9-4935-b002-bdc78cfeb43e/public_url",
      imageUrl:  "https://images.credly.com/size/340x340/images/74790a75-8451-400a-8536-92d792c5184a/CompTIA_Security_2Bce.png"
    },
    {
      abbr:      "AZ-500",
      name:      "Microsoft Azure Security Engineer Associate",
      credlyUrl: "https://www.credly.com/badges/cef8f254-88b9-4935-b002-bdc78cfeb43e/public_url",
      imageUrl:  "https://images.credly.com/size/340x340/images/336eebfc-0ac3-4583-8a4b-8af602a8b3c8/azure-security-engineer-associate600x600.png"
    },
    {
      abbr:      "A+",
      name:      "CompTIA A+",
      credlyUrl: "https://www.credly.com/badges/a5b29d27-d5aa-4f7e-a623-13806196e91d/linked_in_profile",
      imageUrl:  "https://images.credly.com/size/340x340/images/f6b43854-b5c3-4317-9395-a55ca71b08de/CompTIA_A_2Bce.png"
    },
    {
      abbr:      "COURSERA",
      name:      "Coursera Specialization Certificate",
      // ↓ Update the name above once you confirm the specialization title
      credlyUrl: "https://www.coursera.org/account/accomplishments/specialization/BLQDDUYC79C8",
      imageUrl:  ""
    }
  ],

  // ─────────────────────────────────────────────
  // TRAINING & LABS — training.html
  // ─────────────────────────────────────────────
  training: [
    {
      name: "SANS SEC504 — Hacker Tools, Techniques & Incident Handling",
      tools: ["Wireshark", "Tcpdump", "Netcat", "Metasploit", "Nmap", "Volatility"],
      description: "Completed SANS SEC504 coursework covering attacker methodologies, live exploitation techniques, and structured incident response workflows. Applied packet capture analysis with Wireshark and tcpdump, performed memory forensics with Volatility, and practiced containment and eradication procedures across a range of attack scenarios."
    },
    {
      name: "SANS SEC401 — Security Essentials: Network, Endpoint & Cloud",
      tools: ["Splunk", "Zeek", "Suricata", "PowerShell", "Linux CLI", "Nmap"],
      description: "Covered foundational and advanced defensive security concepts including network traffic analysis, endpoint hardening, and cloud security principles. Used Zeek and Suricata for network-based detection, Splunk for log aggregation and alerting, and PowerShell for Windows endpoint investigation."
    },
    {
      name: "TryHackMe — SOC Level 1 Path",
      tools: ["Splunk", "Snort", "Wireshark", "OSINT Tools", "TheHive", "MITRE ATT&CK"],
      description: "Completed the SOC Level 1 learning path covering phishing analysis, SIEM operations, network intrusion detection, and threat intelligence workflows. Practiced alert triage, IOC pivoting, and writing structured incident reports using TheHive."
    },
    {
      name: "Blue Team Labs Online — Threat Detection & Forensics",
      tools: ["Wireshark", "Autopsy", "FTK Imager", "Volatility", "Sysinternals"],
      description: "Hands-on digital forensics and threat hunting labs covering disk imaging, memory analysis, malware artifact extraction, and timeline reconstruction. Practiced identifying attacker persistence mechanisms and lateral movement artifacts across Windows environments."
    },
    {
      name: "LetsDefend — Incident Response Platform",
      tools: ["SIEM", "EDR", "Threat Intelligence Feeds", "Email Header Analysis", "Sandbox"],
      description: "Simulated real-world SOC workflows including alert triage, malware sandbox analysis, phishing investigation, and incident escalation. Developed structured investigation habits aligned with NIST and PICERL incident response frameworks."
    },
    {
      name: "Microsoft Azure — Security & Identity Labs (AZ-500 Prep)",
      tools: ["Azure Security Center", "Microsoft Defender for Cloud", "Azure Sentinel", "Azure AD", "Key Vault"],
      description: "Completed hands-on Azure lab exercises covering identity protection, just-in-time VM access, threat protection policies, and cloud SIEM configuration using Microsoft Sentinel. Practiced securing cloud workloads in alignment with the Azure Security Benchmark."
    }
  ],

  // ─────────────────────────────────────────────
  // CONTACT — contact.html
  // ─────────────────────────────────────────────
  contact: {
    email:    "andrewjharris@protonmail.com",
    linkedin: "https://www.linkedin.com/in/andrewjharris-sec/",
    github:   "https://github.com/andrewjharrisportfolio"
  }

};
