'use client';

import { useToast } from '../../lib/ToastContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

export default function ToastDemo() {
  const { success, error, warning, info } = useToast();

  return (
    <Card padding="lg">
      <h3 className="text-xl font-semibold text-neutral-900 mb-4">
        Toast Notificaties Demo
      </h3>
      <p className="text-neutral-600 mb-6">
        Klik op de buttons om verschillende toast notificaties te testen
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => success('Succes!', 'De actie is succesvol uitgevoerd')}
        >
          Success
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => error('Error!', 'Er is iets misgegaan')}
        >
          Error
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => warning('Let op!', 'Dit is een waarschuwing')}
        >
          Warning
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => info('Info', 'Dit is een informatief bericht')}
        >
          Info
        </Button>
      </div>
    </Card>
  );
}
