'use client';

import React, { useState } from 'react';
import { SkillCategory as SkillCategoryType } from '@/types';
import { ChevronDown, ChevronUp, Code, Database, Cloud } from 'lucide-react';
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
  SiPhp
} from 'react-icons/si';
import { SiCrewai, SiCrewaiHex } from '@icons-pack/react-simple-icons';
import type { ComponentType, SVGProps } from 'react';

interface SkillCategoryProps {
  category: SkillCategoryType;
  isPrimary?: boolean;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ category, isPrimary = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxInitialSkills = 7;
  const hasMoreSkills = category.skills.length > maxInitialSkills;
  const displayedSkills = isExpanded ? category.skills : category.skills.slice(0, maxInitialSkills);

  const skillIcons: Record<string, { Icon: ComponentType<SVGProps<SVGSVGElement>>; color: string }> = {
    // Backend & APIs
    'Python': { Icon: SiPython, color: '#3776AB' },
    'FastAPI': { Icon: SiFastapi, color: '#009688' },
    'Django': { Icon: SiDjango, color: '#092E20' },
    'Flask': { Icon: SiFlask, color: '#000000' },
    'Node.js': { Icon: SiNodedotjs, color: '#339933' },
    'Express': { Icon: SiExpress, color: '#000000' },
    'Go': { Icon: SiGo, color: '#00ADD8' },
    'C#': { Icon: SiDotnet, color: '#512BD4' },
    'ASP.NET Core': { Icon: SiDotnet, color: '#512BD4' },
    'PHP': { Icon: SiPhp, color: '#777BB4' },
    'REST APIs': { Icon: SiSwagger, color: '#85EA2D' },
    'GraphQL': { Icon: SiGraphql, color: '#E10098' },
    'WebSockets': { Icon: SiSocketdotio, color: '#010101' },
    'gRPC': { Icon: SiGooglecloud, color: '#4285F4' },
    'Git': { Icon: SiGit, color: '#F05032' },
    'Postman': { Icon: SiPostman, color: '#FF6C37' },
    'Swagger/OpenAPI': { Icon: SiSwagger, color: '#85EA2D' },
    'Entity Framework': { Icon: Database, color: '#5E5E5E' },
    'Django REST Framework': { Icon: SiDjango, color: '#092E20' },

    // AI Systems & GenAI Engineering
    'AWS Bedrock': { Icon: SiAmazonwebservices, color: '#FF9900' },
    'LangChain': { Icon: SiLangchain, color: '#2B7A78' },
    'CrewAI': { Icon: SiCrewai, color: SiCrewaiHex },
    'Hugging Face Transformers': { Icon: SiHuggingface, color: '#FFD21E' },
    'RAG Pipelines': { Icon: SiMeta, color: '#0668E1' },
    'FAISS': { Icon: SiMeta, color: '#0668E1' },
    'Pinecone': { Icon: SiPinetwork, color: '#0F766E' },
    'OpenSearch': { Icon: SiOpensearch, color: '#005EB8' },
    'PyTorch': { Icon: SiPytorch, color: '#EE4C2C' },
    'TensorFlow': { Icon: SiTensorflow, color: '#FF6F00' },
    'MLflow': { Icon: SiMlflow, color: '#1E88E5' },
    'Scikit-learn': { Icon: SiScikitlearn, color: '#F7931E' },

    // Cloud & Infrastructure
    'AWS': { Icon: SiAmazonwebservices, color: '#FF9900' },
    'Azure': { Icon: Cloud, color: '#0078D4' },
    'GCP': { Icon: SiGooglecloud, color: '#4285F4' },
    'Docker': { Icon: SiDocker, color: '#2496ED' },
    'Kubernetes': { Icon: SiKubernetes, color: '#326CE5' },
    'Terraform': { Icon: SiTerraform, color: '#7B42BC' },
    'GitHub Actions': { Icon: SiGithubactions, color: '#2088FF' },
    'Azure DevOps': { Icon: SiGithubactions, color: '#2088FF' },
    'CloudWatch': { Icon: SiAmazoncloudwatch, color: '#FF4F8B' },
    'Datadog': { Icon: SiDatadog, color: '#632CA6' },
    'Grafana': { Icon: SiGrafana, color: '#F46800' },
    'Prometheus': { Icon: SiPrometheus, color: '#E6522C' },

    // Data Platforms
    'PostgreSQL': { Icon: SiPostgresql, color: '#4169E1' },
    'MS SQL Server': { Icon: Database, color: '#CC2927' },
    'DynamoDB': { Icon: SiAmazonwebservices, color: '#4053D6' },
    'Redis': { Icon: SiRedis, color: '#DC382D' },
    'Snowflake': { Icon: SiSnowflake, color: '#29B5E8' },
    'Apache Airflow': { Icon: SiApacheairflow, color: '#017CEE' },
    'Apache Spark': { Icon: SiApachespark, color: '#E25A1C' },
    'Apache Kafka': { Icon: SiApachekafka, color: '#231F20' },
    'Elasticsearch': { Icon: SiElasticsearch, color: '#005571' },
    'Power BI': { Icon: Database, color: '#F2C811' },
    'Tableau': { Icon: SiTableau, color: '#E97627' },
    'Amazon QuickSight': { Icon: SiAmazonwebservices, color: '#4B9CD3' },

    // Frontend
    'React': { Icon: SiReact, color: '#61DAFB' },
    'Next.js': { Icon: SiNextdotjs, color: '#000000' },
    'Nuxt.js': { Icon: SiNuxtdotjs, color: '#00DC82' },
    'TypeScript': { Icon: SiTypescript, color: '#3178C6' },
    'JavaScript': { Icon: SiJavascript, color: '#F7DF1E' },
    'React Native': { Icon: SiReact, color: '#61DAFB' },
    'Angular': { Icon: SiAngular, color: '#DD0031' },
    'Bootstrap': { Icon: SiBootstrap, color: '#7952B3' },
    'Material UI': { Icon: SiMui, color: '#007FFF' },
    'D3.js': { Icon: SiD3Dotjs, color: '#F9A03C' },
    'Leaflet.js': { Icon: SiLeaflet, color: '#199900' },
    'GeoServer': { Icon: SiMapbox, color: '#4264FB' },
    'PostGIS': { Icon: SiPostgresql, color: '#4169E1' }
  };

  return (
    <div className={`p-4 sm:p-6 lg:p-8 rounded-lg border transition-all duration-200 hover:shadow-md ${
      isPrimary 
        ? 'border-black dark:border-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white' 
        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white'
    } shadow-sm`}>
      <h3 className={`text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 lg:mb-6 ${
        isPrimary 
          ? 'text-gray-800 dark:text-white' 
          : 'text-gray-800 dark:text-white'
      }`}>
        {category.category}
      </h3>
      
      <div className="space-y-3 sm:space-y-4">
        {displayedSkills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="font-medium text-sm sm:text-base text-gray-700 dark:text-gray-200 inline-flex items-center gap-2">
                {(() => {
                  const iconEntry = skillIcons[skill.name];
                  const IconComponent = iconEntry?.Icon || Code;
                  const color = iconEntry?.color;
                  return <IconComponent className="h-4 w-4" style={color ? { color } : undefined} aria-hidden="true" />;
                })()}
                {skill.name}
              </span>
            </div>
            
          </div>
        ))}
      </div>

      {/* Expand/Collapse Button */}
      {hasMoreSkills && (
        <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
          >
            {isExpanded ? (
              <>
                <span>Show Less</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Show {category.skills.length - maxInitialSkills} More</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillCategory;
