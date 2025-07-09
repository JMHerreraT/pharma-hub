import { Zap, Globe, Database, Users, FileText, Mail, Building } from "lucide-react";

export const mockResults = [
    {
      id: 1,
      title: "OpenLoop Tech Stack Setup",
      subtitle: "General / Team - Engineering",
      icon: Zap,
      date: "Jul 1",
      category: "Past week",
    },
    {
      id: 2,
      title: "OpenLoop Web",
      subtitle: "General / ... / OpenLoop Tech Stack Setup",
      icon: Globe,
      date: "Jul 1",
      category: "Past week",
    },
    {
      id: 3,
      title: "OpenLoop API",
      subtitle: "General / ... / OpenLoop Tech Stack Setup",
      icon: Database,
      date: "Jul 1",
      category: "Past week",
    },
    {
      id: 4,
      title: "HR Onboarding - (Jorge Herrera - Senior Software Engineer)",
      subtitle: "",
      icon: Users,
      date: "Jul 1",
      category: "Past week",
    },
    {
      id: 5,
      title: "Headshot Image Sizing Instructions",
      subtitle: "General / ... / Email Signature",
      icon: FileText,
      date: "Jul 1",
      category: "Past week",
    },
    {
      id: 6,
      title: "Clinic CDK stack troubleshooting",
      subtitle: "General / Team - Engineering",
      icon: FileText,
      date: "Jul 1",
      category: "Past week",
    },
    {
      id: 7,
      title: "Healthie Sub Org Set Up",
      subtitle: "2025 Implementation Runbook",
      icon: Building,
      date: "Jul 1",
      category: "Past week",
    },
    {
      id: 8,
      title: "Permissions Matrix",
      subtitle: "",
      icon: FileText,
      date: "Jun 11",
      category: "Past 30 days",
    },
    {
      id: 9,
      title: "Email Signature",
      subtitle: "General / ... / Brand Assets",
      icon: Mail,
      date: "Jun 2",
      category: "Older",
    },
  ]

  type Result = {
    id: number;
    title: string;
    subtitle: string;
    icon: React.ElementType;
    date: string;
    category: string;
  }

  /**
   * Agrupa los resultados por categoría y filtra por texto.
   */
  export function groupAndFilter(
    results: Result[],
    query: string
  ): Record<string, Result[]> {
    const grouped = results.reduce<Record<string, Result[]>>((acc, result) => {
      const matches =
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.subtitle.toLowerCase().includes(query.toLowerCase());

      if (matches) {
        if (!acc[result.category]) {
          acc[result.category] = [];
        }
        acc[result.category].push(result);
      }

      return acc;
    }, {});

    return grouped;
  }
