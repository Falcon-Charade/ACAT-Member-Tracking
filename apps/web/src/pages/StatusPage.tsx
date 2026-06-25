import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileQuestion,
  Lock,
  ShieldAlert,
  TimerReset,
  Trash2,
  Wrench,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type StatusTone = 'success' | 'warning' | 'danger' | 'neutral';

export interface StatusPageContent {
  code: number;
  title: string;
  description: string;
  tone: StatusTone;
  icon:
    | 'success'
    | 'trash'
    | 'invalid'
    | 'auth'
    | 'permission'
    | 'not-found'
    | 'rate-limit'
    | 'server'
    | 'maintenance'
    | 'timeout';
}

const iconMap = {
  success: CheckCircle2,
  trash: Trash2,
  invalid: AlertTriangle,
  auth: Lock,
  permission: ShieldAlert,
  'not-found': FileQuestion,
  'rate-limit': TimerReset,
  server: XCircle,
  maintenance: Wrench,
  timeout: Clock,
};

const toneClassName: Record<StatusTone, string> = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
  neutral: 'bg-slate-50 text-slate-700 border-slate-200',
};

interface StatusPageProps {
  content: StatusPageContent;
}

export function StatusPage({ content }: StatusPageProps) {
  const Icon = iconMap[content.icon];

  return (
    <div className="flex min-h-[60svh] items-center justify-center">
      <Card className="w-full max-w-xl">
        <CardHeader className="items-center text-center">
          <div
            className={`mb-2 flex size-14 items-center justify-center rounded-full border ${toneClassName[content.tone]}`}
          >
            <Icon className="size-7" aria-hidden="true" />
          </div>
          <CardDescription className="text-sm font-medium">
            Status {content.code}
          </CardDescription>
          <CardTitle className="text-2xl">{content.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 text-center">
          <p className="text-muted-foreground">{content.description}</p>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
            <Button variant="outline" asChild>
              <Link to="/">Return home</Link>
            </Button>
            <Button asChild>
              <Link to="/add">Add member</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
