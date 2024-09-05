<?php

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


//Load Composer's autoloader
require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);
$emailDeEnvio = "assistentesurgical@gmail.com";
$emailDeRecebimento = "assistentesurgical@gmail.com";

//Server settings
$mail->isSMTP();                                           //Send using SMTP
$mail->Host = 'smtp.gmail.com';                            //Set the SMTP server to send through
$mail->SMTPAuth = true;                                    //Enable SMTP authentication
$mail->Username = 'assistentesurgical@gmail.com';          //SMTP username
$mail->Password = 'qqjq cxtu jvri fyay';                   //SMTP password
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;           //Enable implicit TLS encryption
$mail->Port = 465;                                         //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
$mail->SMTPOptions = array(
  'ssl' => array(
    'verify_peer' => false,
    'verify_peer_name' => false,
    'allow_self_signed' => true
  )
);

//Recipients
$mail->setFrom($emailDeEnvio, 'Site');


//Definição da codificação do email
$mail->setLanguage('pt_br', '/optional/path/to/language/directory/');
$mail->CharSet = 'UTF-8';
$mail->Encoding = 'base64';

//Pagina SAC
if(!(isset($_POST['modelo']))){
  $nome = $_POST['nome'];
  $email = $_POST['email'];
  $telefone = $_POST['telefone'];
  $assunto = $_POST['assunto'];
  $estado = $_POST['estado'];
  $cidade = $_POST['cidade'];
  $identificação = $_POST['cpf'];

  $mail->addAddress('sanbajur@hotmail.com', 'Sandra');     //Add a recipient
  $mail->addCC('qualidade@surgicaltec.com.br', 'Qualidade');
  //Content
  $mail->isHTML(true);                              //Set email format to HTML
  $mail->Subject = ("Você recebeu um email no seu serviço de atendimento ao cliente(SAC)");
  $body = ("<p>Nome: $nome</p>
  <p>Email: $email</p>
  <p>Telefone: $telefone</p>
  <p>Estado: $estado ; Cidade: $cidade</p> 
  <p>CPF/CNPJ: $identificação </p>
  <p>$assunto</p>");
  $mail->Body = $body;
  
  if(isset($_FILES['arquivo'])){
    // Adicionar os anexos
    echo("Achou o arquivo");
    $arquivo = $_FILES['arquivo'];
    // Adicionar o arquivo como anexo
    $mail->AddAttachment($arquivo['tmp_name'], $arquivo['name']);
  }
}
//Pagina Orcamento
else{ 
  $nome = $_POST['nome'];
  $cpf = $_POST['cnpj'];
  $telefone = $_POST['telefone'];
  $email = $_POST['email'];
  $tipo= $_POST['tipo-de-servico'];
  $modelo= $_POST['modelo'];
  $mensagem = $_POST['descricao'];
  $endereco = $_POST['logradouro'] . ',' . $_POST['numero'] . '-'. $_POST['bairro'].','.$_POST['cidade'].','. $_POST['estado'] . '-' . $_POST['CEP'];
  
  //Content
  $mail->addAddress('contato@surgicaltec.com.br', 'Comercial');     //Add a recipient
  $mail->isHTML(true);                                  //Set email format to HTML
  $mail->Subject = ('Orçamento');
  $mail->Body = "<p>Nome: $nome</p>
  <p>Email: $email</p>
  <p>Telefone: $telefone</p>
  <p>CPF/CNPJ: $cpf </p>
  <p>Endereço: $endereco</p>
  <p>Tipo de serviço: $tipo</p>
  <p>Modelo de Equipamento: $modelo</p>
  <p>$mensagem</p>
  ";
}
// Envia o e-mail
if ($mail->send()) {
  // E-mail enviado com sucesso
  echo '<script>alert("E-mail enviado com sucesso!");history.go(-1)</script>;';
} else {
  // Erro ao enviar o e-mail
  echo "Erro ao enviar o e-mail: " . $mail->ErrorInfo;
}
