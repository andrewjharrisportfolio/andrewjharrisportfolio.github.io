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
    { value: "150+",  label: "Monthly Incidents Handled", color: "cyan"   },
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
      imageUrl:  ""
    },
    {
      abbr:      "AZ-500",
      name:      "Microsoft Azure Security Engineer Associate",
      credlyUrl: "https://learn.microsoft.com/api/credentials/share/en-us/AndrewHarris-1272/19DF8BF95AD43DD7?sharingId=C16A570FF06800C4",
      imageUrl:  ""
    },
    {
      abbr:      "A+",
      name:      "CompTIA A+",
      credlyUrl: "https://www.credly.com/badges/a5b29d27-d5aa-4f7e-a623-13806196e91d/linked_in_profile",
      imageUrl:  ""
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
      featured: true,
      tools: ["Wireshark", "Tcpdump", "Netcat", "Metasploit", "Nmap", "Volatility"],
      description: "Completed SANS SEC504 coursework covering attacker methodologies, live exploitation techniques, and structured incident response workflows. Applied packet capture analysis with Wireshark and tcpdump, performed memory forensics with Volatility, and practiced containment and eradication procedures across a range of attack scenarios."
    },
    {
      name: "SANS SEC401 — Security Essentials: Network, Endpoint & Cloud",
      featured: true,
      tools: ["Splunk", "Zeek", "Suricata", "PowerShell", "Linux CLI", "Nmap"],
      description: "Covered foundational and advanced defensive security concepts including network traffic analysis, endpoint hardening, and cloud security principles. Used Zeek and Suricata for network-based detection, Splunk for log aggregation and alerting, and PowerShell for Windows endpoint investigation."
    },
    {
      name: "LetsDefend — Incident Response Platform",
      tools: ["SIEM", "EDR", "Threat Intelligence Feeds", "Email Header Analysis", "Sandbox"],
      description: "Simulated real-world SOC workflows including alert triage, malware sandbox analysis, phishing investigation, and incident escalation. Developed structured investigation habits aligned with NIST and PICERL incident response frameworks."
    },
    {
      name: "Blue Cape Security — DFIR Foundations and Techniques",
      featured: true,
      tools: ["Wireshark", "Splunk", "Volatility3", "CyberChef", "Eric Zimmerman's Tools", "MITRE ATT&CK"],
      description: "8-hour instructor-led bootcamp covering core Digital Forensics and Incident Response methodologies. Topics included incident response procedures, data collection techniques, applied forensic analysis, and essential DFIR tooling. Completed course assessment with 84%, identifying key strengths and areas for continued growth. Applied coursework hands-on through a self-built lab environment to analyze a real attack scenario — tracing a full intrusion chain from initial phishing through C2 beaconing, persistence, and data exfiltration, mapped to the MITRE ATT&CK framework."
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
