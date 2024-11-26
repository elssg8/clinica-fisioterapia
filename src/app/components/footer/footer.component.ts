import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  showTermsModal: boolean = false;
  termsAndConditions: string = `El presente documento establece los términos y condiciones bajo los cuales Deus Fisioterapia ofrece sus servicios a los pacientes. Al solicitar una cita o recibir tratamiento en nuestras instalaciones, el paciente acepta y se compromete a cumplir con los lineamientos establecidos.

El Consultorio proporciona servicios especializados en fisioterapia para la evaluación, diagnóstico y tratamiento de diversas afecciones físicas. Sin embargo, los resultados pueden variar en función de las características individuales de cada paciente y de su adherencia al plan terapéutico prescrito. Es responsabilidad del paciente proporcionar información completa y veraz sobre su historial médico y cualquier condición de salud relevante.

Las citas deberán ser programadas con anticipación, y cualquier cancelación deberá notificarse al menos 24 horas antes de la cita agendada. En caso de inasistencia sin previo aviso o cancelaciones tardías, el Consultorio podrá aplicar un cargo compensatorio. El pago por los servicios contratados deberá realizarse al momento de la consulta, y no se otorgarán reembolsos por servicios ya proporcionados.

El Consultorio se reserva el derecho de modificar estos términos y condiciones sin previo aviso, comprometiéndose a informar a los pacientes sobre cualquier cambio significativo a través de los canales de comunicación habituales. Para cualquier duda o aclaración, el paciente podrá comunicarse directamente con el Consultorio mediante los datos de contacto proporcionados en nuestras instalaciones o sitio web.`;
showPrivacyModal: boolean = false;
  privacyNotice: string = `Deus Fisioterapia, con domicilio en [insertar dirección], es responsable del tratamiento y resguardo de los datos personales proporcionados por los pacientes. Este aviso de privacidad se emite en cumplimiento de las disposiciones legales aplicables en materia de protección de datos personales.

Deus Fisioterapia recopila datos personales de identificación, contacto y relacionados con el estado de salud de los pacientes, tales como nombre completo, número telefónico, correo electrónico e información médica relevante. Estos datos son utilizados exclusivamente para la prestación de los servicios ofrecidos, la gestión de citas, la elaboración de planes terapéuticos personalizados y el cumplimiento de requerimientos legales.

El tratamiento de los datos personales se lleva a cabo bajo estrictas medidas de seguridad administrativas, técnicas y físicas, con el objetivo de protegerlos contra daño, pérdida, alteración, destrucción o uso no autorizado. Deus Fisioterapia no compartirá la información personal de los pacientes con terceros sin su consentimiento explícito, salvo en los casos previstos por la ley o cuando sea estrictamente necesario para atender situaciones de urgencia médica.

El paciente tiene derecho a acceder, rectificar, cancelar u oponerse al uso de sus datos personales, conforme a lo dispuesto en la legislación vigente. Para ejercer estos derechos, deberá enviar una solicitud escrita al correo electrónico [insertar correo] o presentarla directamente en nuestras instalaciones.

Deus Fisioterapia se reserva el derecho de actualizar este aviso de privacidad en función de modificaciones legales, operativas o de cualquier otra índole. Las versiones actualizadas estarán disponibles en nuestras instalaciones y, en su caso, en los medios digitales correspondientes.

Para cualquier consulta relacionada con este aviso de privacidad o el manejo de sus datos personales, el paciente podrá contactarnos mediante los datos de contacto proporcionados.`;


  openTermsModal(event: Event): void {
    event.preventDefault();
    this.showTermsModal = true;
  }

  closeTermsModal(): void {
    this.showTermsModal = false;
  }

  openPrivacyModal(event: Event): void {
    event.preventDefault();
    this.showPrivacyModal = true;
  }

  closePrivacyModal(): void {
    this.showPrivacyModal = false;
  }
}
