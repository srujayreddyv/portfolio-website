import React from 'react';
import { SkillCategory as SkillCategoryType } from '@/types';
import { Code, Database, Cloud } from 'lucide-react';
import {
  SiAmazoncloudwatch,
  SiAmazonwebservices,
  SiAngular,
  SiApacheairflow,
  SiApachekafka,
  SiApachespark,
  SiBootstrap,
  SiDatadog,
  SiD3Dotjs,
  SiDjango,
  SiDocker,
  SiDotnet,
  SiElasticsearch,
  SiExpress,
  SiFastapi,
  SiFlask,
  SiGit,
  SiGithubactions,
  SiGo,
  SiGooglecloud,
  SiGrafana,
  SiGraphql,
  SiHuggingface,
  SiJavascript,
  SiKubernetes,
  SiLangchain,
  SiLeaflet,
  SiMapbox,
  SiMeta,
  SiMlflow,
  SiMui,
  SiNodedotjs,
  SiNextdotjs,
  SiNuxtdotjs,
  SiOpensearch,
  SiPinetwork,
  SiPostgresql,
  SiPostman,
  SiPrometheus,
  SiPytorch,
  SiReact,
  SiRedis,
  SiScikitlearn,
  SiSnowflake,
  SiSocketdotio,
  SiSwagger,
  SiTableau,
  SiTensorflow,
  SiTerraform,
  SiTypescript,
  SiPython,
  SiPhp,
} from 'react-icons/si';
import { SiCrewai, SiCrewaiHex } from '@icons-pack/react-simple-icons';
import type { ComponentType, SVGProps } from 'react';

interface SkillCategoryProps {
  category: SkillCategoryType;
  isPrimary?: boolean;
}

const skillIcons: Record<string, { Icon: ComponentType<SVGProps<SVGSVGElement>>; color: string }> = {
  // Backend & APIs
  Python: { Icon: SiPython, color: '#3776AB' },
  FastAPI: { Icon: SiFastapi, color: '#009688' },
  Django: { Icon: SiDjango, color: '#092E20' },
  Flask: { Icon: SiFlask, color: '#000000' },
  'Node.js': { Icon: SiNodedotjs, color: '#339933' },
  Express: { Icon: SiExpress, color: '#5E5E5E' },
  Go: { Icon: SiGo, color: '#00ADD8' },
  Golang: { Icon: SiGo, color: '#00ADD8' },
  'C#': { Icon: SiDotnet, color: '#512BD4' },
  'ASP.NET': { Icon: SiDotnet, color: '#512BD4' },
  'ASP.NET Core': { Icon: SiDotnet, color: '#512BD4' },
  PHP: { Icon: SiPhp, color: '#777BB4' },
  REST: { Icon: SiSwagger, color: '#85EA2D' },
  'REST APIs': { Icon: SiSwagger, color: '#85EA2D' },
  GraphQL: { Icon: SiGraphql, color: '#E10098' },
  WebSockets: { Icon: SiSocketdotio, color: '#010101' },
  gRPC: { Icon: SiGooglecloud, color: '#4285F4' },
  Git: { Icon: SiGit, color: '#F05032' },
  Postman: { Icon: SiPostman, color: '#FF6C37' },
  'Swagger/OpenAPI': { Icon: SiSwagger, color: '#85EA2D' },
  'Entity Framework': { Icon: Database, color: '#5E5E5E' },
  'Django REST Framework': { Icon: SiDjango, color: '#092E20' },

  // AI Systems
  'AWS Bedrock': { Icon: SiAmazonwebservices, color: '#FF9900' },
  LangChain: { Icon: SiLangchain, color: '#2B7A78' },
  LangGraph: { Icon: SiLangchain, color: '#2B7A78' },
  LangSmith: { Icon: SiLangchain, color: '#2B7A78' },
  CrewAI: { Icon: SiCrewai, color: SiCrewaiHex },
  'Hugging Face Transformers': { Icon: SiHuggingface, color: '#FFD21E' },
  'RAG Pipelines': { Icon: SiMeta, color: '#0668E1' },
  'Vector Search (FAISS, Pinecone, OpenSearch)': { Icon: SiMeta, color: '#0668E1' },
  'Vector Search (FAISS, Pinecone)': { Icon: SiMeta, color: '#0668E1' },
  FAISS: { Icon: SiMeta, color: '#0668E1' },
  Pinecone: { Icon: SiPinetwork, color: '#0F766E' },
  OpenSearch: { Icon: SiOpensearch, color: '#005EB8' },
  PyTorch: { Icon: SiPytorch, color: '#EE4C2C' },
  TensorFlow: { Icon: SiTensorflow, color: '#FF6F00' },
  MLflow: { Icon: SiMlflow, color: '#1E88E5' },
  'Scikit learn': { Icon: SiScikitlearn, color: '#F7931E' },
  'Scikit-learn': { Icon: SiScikitlearn, color: '#F7931E' },

  // Cloud
  AWS: { Icon: SiAmazonwebservices, color: '#FF9900' },
  Azure: { Icon: Cloud, color: '#0078D4' },
  GCP: { Icon: SiGooglecloud, color: '#4285F4' },
  Docker: { Icon: SiDocker, color: '#2496ED' },
  Kubernetes: { Icon: SiKubernetes, color: '#326CE5' },
  Terraform: { Icon: SiTerraform, color: '#7B42BC' },
  'GitHub Actions': { Icon: SiGithubactions, color: '#2088FF' },
  'Azure DevOps': { Icon: SiGithubactions, color: '#2088FF' },
  'CI/CD': { Icon: SiGithubactions, color: '#2088FF' },
  CloudWatch: { Icon: SiAmazoncloudwatch, color: '#FF4F8B' },
  Datadog: { Icon: SiDatadog, color: '#632CA6' },
  Grafana: { Icon: SiGrafana, color: '#F46800' },
  Prometheus: { Icon: SiPrometheus, color: '#E6522C' },

  // Data
  PostgreSQL: { Icon: SiPostgresql, color: '#4169E1' },
  'Microsoft SQL Server': { Icon: Database, color: '#CC2927' },
  'MS SQL': { Icon: Database, color: '#CC2927' },
  'MS SQL Server': { Icon: Database, color: '#CC2927' },
  DynamoDB: { Icon: SiAmazonwebservices, color: '#4053D6' },
  Redis: { Icon: SiRedis, color: '#DC382D' },
  Kafka: { Icon: SiApachekafka, color: '#231F20' },
  Airflow: { Icon: SiApacheairflow, color: '#017CEE' },
  Spark: { Icon: SiApachespark, color: '#E25A1C' },
  Snowflake: { Icon: SiSnowflake, color: '#29B5E8' },
  'Apache Airflow': { Icon: SiApacheairflow, color: '#017CEE' },
  'Apache Spark': { Icon: SiApachespark, color: '#E25A1C' },
  'Apache Kafka': { Icon: SiApachekafka, color: '#231F20' },
  Elasticsearch: { Icon: SiElasticsearch, color: '#005571' },
  'Power BI': { Icon: Database, color: '#F2C811' },
  Tableau: { Icon: SiTableau, color: '#E97627' },
  'Amazon QuickSight': { Icon: SiAmazonwebservices, color: '#4B9CD3' },
  'Prompt Engineering': { Icon: Code, color: '#5E5E5E' },
  RAGAS: { Icon: SiMeta, color: '#0668E1' },
  MCP: { Icon: Code, color: '#5E5E5E' },
  'Multi-Agent Systems': { Icon: Code, color: '#5E5E5E' },

  // Frontend
  React: { Icon: SiReact, color: '#61DAFB' },
  'Next.js': { Icon: SiNextdotjs, color: '#000000' },
  'Nuxt.js': { Icon: SiNuxtdotjs, color: '#00DC82' },
  TypeScript: { Icon: SiTypescript, color: '#3178C6' },
  JavaScript: { Icon: SiJavascript, color: '#F7DF1E' },
  'React Native': { Icon: SiReact, color: '#61DAFB' },
  Angular: { Icon: SiAngular, color: '#DD0031' },
  Bootstrap: { Icon: SiBootstrap, color: '#7952B3' },
  'Material UI': { Icon: SiMui, color: '#007FFF' },
  'D3.js': { Icon: SiD3Dotjs, color: '#F9A03C' },
  'Leaflet.js': { Icon: SiLeaflet, color: '#199900' },
  GeoServer: { Icon: SiMapbox, color: '#4264FB' },
  PostGIS: { Icon: SiPostgresql, color: '#4169E1' },
};

/**
 * Direction 2 — skill rows as mono entries with proficiency + year tags.
 * Each row: icon · skill name · [proficiency · Ny] in a compact mono tag.
 */
const SkillCategory: React.FC<SkillCategoryProps> = ({ category, isPrimary = false }) => {
  return (
    <div
      className={`border ${
        isPrimary ? 'border-hairline bg-surface' : 'border-hairline bg-surface/60'
      } p-4 sm:p-5 lg:p-6 hover:border-accent/50 transition-colors duration-150`}
    >
      {/* Category header */}
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h3 className="font-mono text-sm sm:text-base font-semibold text-ink leading-tight">
          {category.category.toLowerCase()}
        </h3>
        {isPrimary && (
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.12em] text-accent">
            core
          </span>
        )}
      </div>

      {/* Skill rows */}
      <ul className="space-y-2">
        {category.skills.map((skill) => {
          const iconEntry = skillIcons[skill.name];
          const IconComponent = iconEntry?.Icon ?? Code;
          const iconColor = iconEntry?.color;
          return (
            <li
              key={skill.name}
              className="flex items-center justify-between gap-3 font-mono text-[12px] sm:text-[13px] text-ink/85"
            >
              <span className="inline-flex items-center gap-2 min-w-0 flex-1">
                <IconComponent
                  className="h-3.5 w-3.5 flex-shrink-0"
                  style={iconColor ? { color: iconColor } : undefined}
                  aria-hidden="true"
                />
                <span className="truncate">{skill.name}</span>
              </span>
              {skill.level && (
                <span
                  className={`flex-shrink-0 font-mono text-[10px] sm:text-[11px] ${
                    skill.level === 'Expert'
                      ? 'text-accent'
                      : skill.level === 'Advanced'
                        ? 'text-ink/70'
                        : 'text-muted'
                  }`}
                >
                  {skill.level.toLowerCase()}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SkillCategory;
